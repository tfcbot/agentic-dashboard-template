'use client';

import { useUserCreditsRemaining } from '@/hooks/useBilling';

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
            <div className="h-6 bg-gray-800 rounded animate-pulse w-24" />
          </div>
        ) : (
          <span>Credits: {data?.toLocaleString() ?? 0}</span>
        )}
      </div>
    </div>
  );
} 