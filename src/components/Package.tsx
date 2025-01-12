'use client';

import { Button } from './ui/button';
import { useAgent } from '@/hooks/useAgents';
import { useRouter } from 'next/navigation';

interface PackageProps {
  agentId: string;
}

export function Package({ agentId }: PackageProps) {
  const router = useRouter();
  const { agent, loading } = useAgent(agentId);

  if (loading) {
    return <div>Loading package details...</div>;
  }

  if (!agent) {
    return null;
  }

  const handleStartNow = () => {
    router.push(`/agent/${agentId}/intake`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{agent.credits}</span>
            <span className="text-sm text-gray-400">credits</span>
          </div>
        </div>

        {/* Features List */}
        <ul className="mb-8 space-y-4">
          {agent.keyDeliverables.map((feature: string, index: number) => (
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
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleStartNow}
          variant="default"
        >
          Start Now
        </Button>
      </div>
    </div>
  );
} 