'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Deliverable } from '@/components/Deliverable';
import { useGetDeliverable } from '@/hooks/useApi';

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
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-800 rounded animate-pulse w-1/3" />
            <div className="h-10 bg-gray-800 rounded animate-pulse w-40" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-8">
            {/* Title Section */}
            <div className="h-6 bg-gray-800 rounded animate-pulse w-1/2 mb-4" />

            {/* Content Sections */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="h-6 bg-gray-800 rounded animate-pulse w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-4/6" />
                </div>
              </div>
            ))}

            {/* List Items */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-800 rounded animate-pulse w-1/4" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
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