'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Deliverable } from '@/components/Deliverable';
import { getMockDeliverable } from '@/lib/mockData';
import LoadingSpinner from '@/components/LoadingSpinner';

interface DeliverablePageProps {
  params: {
    id: string;
  };
}

export default function DeliverablePage({ params }: DeliverablePageProps) {
  const router = useRouter();
  const [deliverable, setDeliverable] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliverable = async () => {
      try {
        const data = await getMockDeliverable(params.id);
        setDeliverable(data);
      } catch (err) {
        setError('Failed to load deliverable');
        console.error('Error fetching deliverable:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliverable();
  }, [params.id]);

  const handleRequestReview = () => {
    // Mock functionality
    alert('Expert review requested! We will contact you shortly.');
  };

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

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-8 bg-red-900/20 rounded-lg">
          {error}
        </div>
      ) : deliverable ? (
        <Deliverable
          title={deliverable.title}
          summary={deliverable.summary}
          content={deliverable.content}
          formats={deliverable.formats}
          onRequestReview={handleRequestReview}
        />
      ) : (
        <div className="text-center text-gray-500">
          No deliverable found
        </div>
      )}
    </div>
  );
} 