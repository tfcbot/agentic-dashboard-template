'use client';

import { DashboardHeader } from '@/components/DashboardHeader';
import { AgentCard } from '@/components/AgentCard';
import { useAgents } from '@/hooks/useAgents';
import { AgentConfig } from '@/schemas/agent';

export default function HomePage() {
  const { data: agents, loading, error } = useAgents();
  
  return (
    <div className="transition-all duration-300">
      <div className="p-4 lg:p-8">
        <DashboardHeader title="Available Agents" />
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 flex flex-col h-full">
                  {/* Header with Avatar and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-gray-800 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-800 rounded animate-pulse w-32" />
                      <div className="h-4 bg-gray-800 rounded animate-pulse w-24" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-4/6" />
                  </div>

                  {/* Key Features */}
                  <div className="mb-6 flex-grow">
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-24 mb-2" />
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500/50 animate-pulse" />
                          <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="h-10 bg-gray-800 rounded animate-pulse w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              Failed to load agents. Please try again later.
            </div>
          ) : agents && agents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agents.map((agent: AgentConfig) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                />
              ))}
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