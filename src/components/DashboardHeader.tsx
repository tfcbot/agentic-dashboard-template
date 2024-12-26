'use client';

import { useUserCreditsRemaining } from '@/app/hooks/useApi';
import LoadingSpinner from '@/components/LoadingSpinner';

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const { data, isLoading } = useUserCreditsRemaining();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <div className="text-gray-300">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner />
            <span>Loading credits...</span>
          </div>
        ) : (
          <span>Credits: {data?.credits?.toLocaleString() ?? 0}</span>
        )}
      </div>
    </div>
  );
} 