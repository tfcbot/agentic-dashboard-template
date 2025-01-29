'use client';

import { Button } from './ui/button';
import { useAgent } from '@/hooks/useAgents';
import { useRouter } from 'next/navigation';
import { useUserCreditsRemaining } from '@/hooks/useBilling';

interface PackageProps {
  agentId: string;
}

export function Package({ agentId }: PackageProps) {
  const router = useRouter();
  const { agent, loading: agentLoading } = useAgent(agentId);
  const { data: credits = 0, isLoading: creditsLoading } = useUserCreditsRemaining();

  if (agentLoading) {
    return (
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        <div className="space-y-6">
          {/* Price Skeleton */}
          <div className="flex justify-end items-baseline gap-2">
            <div className="h-8 bg-gray-800 rounded animate-pulse w-16" />
            <div className="h-4 bg-gray-800 rounded animate-pulse w-12" />
          </div>

          {/* Estimated Delivery Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 bg-gray-800 rounded animate-pulse w-48" />
          </div>

          {/* Button Skeleton */}
          <div className="h-10 bg-gray-800 rounded animate-pulse w-full" />
        </div>
      </div>
    );
  }

  if (!agent) {
    return null;
  }

  const handleStartNow = () => {
    router.push(`/agent/${agentId}/intake`);
  };

  const hasEnoughCredits = credits >= agent.credits;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        {/* Price */}
        <div className="mb-6">
          <div className="flex justify-end items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{agent.credits}</span>
            <span className="text-sm text-gray-400">credits</span>
          </div>
          {!hasEnoughCredits && !creditsLoading && (
            <div className="text-right mt-2">
              <span className="text-sm text-red-400">
                You need {agent.credits - credits} more credits
              </span>
            </div>
          )}
        </div>

        {/* Estimated Delivery */}
        {agent.estimatedDelivery && (
          <div className="mb-6 flex items-center text-gray-300">
            <svg
              className="mr-2 h-5 w-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Estimated delivery: {agent.estimatedDelivery}</span>
          </div>
        )}

        {/* Features List */}
        <ul className="mb-8 space-y-4">
          {agent.packageDescription.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-gray-300">
              <svg
                className="mr-3 h-5 w-5 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <Button
          onClick={handleStartNow}
          disabled={!hasEnoughCredits || creditsLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {creditsLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
          ) : !hasEnoughCredits ? (
            'Not Enough Credits'
          ) : (
            'Start Now'
          )}
        </Button>
      </div>
    </div>
  );
} 