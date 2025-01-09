'use client';

import { DashboardHeader } from '@/components/DashboardHeader';
import { AgentCard } from '@/components/AgentCard';
import { useAgents } from '@/hooks/useAgents';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Agent } from '@/schemas/agent';

export default function HomePage() {
  const { data: agents, loading, error } = useAgents();
  

  console.log('Agents', agents);
  return (
    <div className="transition-all duration-300">
      <div className="p-4 lg:p-8">
        <DashboardHeader title="Available Agents" />
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              Failed to load agents. Please try again later.
            </div>
          ) : agents && agents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agents.map((agent: Agent) => {
                console.log('Rendering agent:', agent.id);
                return (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No agents available
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 