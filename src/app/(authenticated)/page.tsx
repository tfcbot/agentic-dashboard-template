'use client';

import { DashboardHeader } from '@/components/DashboardHeader';
import { AgentCard } from '@/components/AgentCard';
import { useAgents } from '@/hooks/useAgents';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HomePage() {
  const { agents, loading, error } = useAgents();

  return (
    <div className="transition-all duration-300">
      <div className="p-4 lg:p-8">
        <DashboardHeader title="Available Agents" />

        {/* Main Content Area */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              Failed to load agents. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agentId={agent.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 