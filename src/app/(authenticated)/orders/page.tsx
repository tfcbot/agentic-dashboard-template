'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/DashboardHeader';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useGetOrders } from '@/hooks/useApi';
import { OrderResponseBody } from '@/schemas/http-responses';
import { SearchInput } from '@/components/ui/SearchInput';

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders = { data: [] }, isLoading, error } = useGetOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  // Sort orders by timestamp in descending order
  const sortedOrders = useMemo(() => {
    // Ensure orders.data exists before attempting to sort
    const orderData = orders?.data || [];
    return [...orderData].sort((a, b) => 
      new Date(b.orderCreatedAt).getTime() - new Date(a.orderCreatedAt).getTime()
    );
  }, [orders?.data]); // Change dependency to use optional chaining

  // Filter orders based on search query
  const filteredOrders = useMemo(() => {
    if (!searchQuery) return sortedOrders;
    
    const query = searchQuery.toLowerCase();
    return sortedOrders.filter(order => 
      order.deliverableName?.toLowerCase().includes(query) ?? false
    );
  }, [sortedOrders, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const handleViewDeliverable = async (orderId: string) => {
    setLoadingOrderId(orderId);
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="transition-all duration-300">
      <div className="p-4 lg:p-8">
        <DashboardHeader title="Orders" />
        <div className="mt-8">
          {isLoading ? (
            <div className="overflow-x-auto flex flex-col items-center">
              <div className="min-w-[800px] mb-4 flex justify-end">
                <div className="w-72">
                  <div className="h-10 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
              <table className="min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="w-1/3 py-3 px-2 text-left text-sm font-medium text-gray-400">Deliverable Name</th>
                    <th className="w-[120px] py-3 px-2 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="w-[180px] py-3 px-2 text-left text-sm font-medium text-gray-400">Created</th>
                    <th className="w-[100px] py-3 px-2 text-right text-sm font-medium text-gray-400">Deliverable</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index} className="border-t border-gray-800">
                      <td className="py-3 px-2">
                        <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4" />
                      </td>
                      <td className="py-3 px-2">
                        <div className="h-6 bg-gray-800 rounded animate-pulse w-20" />
                      </td>
                      <td className="py-3 px-2">
                        <div className="h-6 bg-gray-800 rounded animate-pulse w-32" />
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="h-9 bg-gray-800 rounded animate-pulse w-16 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              {error.message}
            </div>
          ) : orders.data.length > 0 ? (
            <div className="overflow-x-auto flex flex-col items-center">
              <div className="min-w-[800px] mb-4 flex justify-end">
                <div className="w-72">
                  <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search orders..."
                  />
                </div>
              </div>
              <table className="min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="w-1/3 py-3 px-2 text-left text-sm font-medium text-gray-400">Deliverable Name</th>
                    <th className="w-[120px] py-3 px-2 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="w-[180px] py-3 px-2 text-left text-sm font-medium text-gray-400">Created</th>
                    <th className="w-[100px] py-3 px-2 text-right text-sm font-medium text-gray-400">Deliverable</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order: OrderResponseBody) => (
                    <tr key={order.orderId} className="border-t border-gray-800">
                      <td className="py-3 px-2 text-gray-300">{order.deliverableName}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-300">
                        {format(new Date(order.orderCreatedAt), 'MMM d, yyyy HH:mm')}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <Button
                          onClick={() => handleViewDeliverable(order.orderId)}
                          disabled={order.orderStatus === 'pending' || loadingOrderId === order.orderId}
                          className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingOrderId === order.orderId ? (
                            <div className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Loading...
                            </div>
                          ) : (
                            'View'
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 