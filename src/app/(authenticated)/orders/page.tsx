'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/DashboardHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useGetOrders } from '@/hooks/useApi';
import { OrderResponseBody } from '@/schemas/http-responses';
import { SearchInput } from '@/components/ui/SearchInput';

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders = { data: [] } , isLoading, error } = useGetOrders();
  const [searchQuery, setSearchQuery] = useState('');

  // Sort orders by timestamp in descending order
  const sortedOrders = useMemo(() => {
    return [...orders.data].sort((a, b) => 
      new Date(b.orderCreatedAt).getTime() - new Date(a.orderCreatedAt).getTime()
    );
  }, [orders.data]);

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

  const handleViewDeliverable = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="transition-all duration-300">
      <div className="p-4 lg:p-8">
        <div className="flex justify-between items-center">
          <DashboardHeader title="Orders" />
          <div className="w-72">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search orders..."
            />
          </div>
        </div>
        <div className="mt-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              {error.message}
            </div>
          ) : orders.data.length > 0 ? (
            <div className="overflow-x-auto flex justify-center">
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
                          className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          View
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