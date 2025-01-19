'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/DashboardHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useGetOrders } from '@/hooks/useApi';
import { OrderResponseBody } from '@/schemas/http-responses';


export default function OrdersPage() {
  const router = useRouter();
  const { data: orders = { data: [] } , isLoading, error } = useGetOrders();

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
        <DashboardHeader title="Orders" />
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
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Deliverable Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Agent</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Created</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-400">Deliverable</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.data.map((order: OrderResponseBody) => (
                    <tr key={order.orderId} className="border-t border-gray-800">
                      <td className="py-3 px-4 text-gray-300">{order.deliverableName}</td>
                      <td className="py-3 px-4 text-gray-300">{order.agentName}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {format(new Date(order.orderCreatedAt), 'MMM d, yyyy HH:mm')}
                      </td>
                      <td className="py-3 px-4 text-right">
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