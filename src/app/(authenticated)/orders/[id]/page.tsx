'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Deliverable } from '@/components/Deliverable';
import { useGetDeliverable } from '@/hooks/useApi';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { AgentConfig } from '@/schemas/agent';

interface DeliverablePageProps {
  params: {
    id: string;
  };
}

export default function DeliverablePage({ params }: DeliverablePageProps) {
  const { data: deliverable, isLoading, error } = useGetDeliverable(params.id);

  return (
    <div className="p-4 lg:p-8">
      {/* Back Button */}
      <Link href="/orders" className="flex items-center text-gray-400 hover:text-white mb-8">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Orders
      </Link>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-8 bg-red-900/20 rounded-lg">
          {error.message}
        </div>
      ) : deliverable ? (
        <Deliverable
          deliverable={deliverable.data}
        />
      ) : (
        <div className="text-center text-gray-500">
          No deliverable found
        </div>
      )}
    </div>
  );
} 