'use client';

import { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Agent } from '@/schemas/agent';

interface AgentResponse {
  success: boolean;
  data: Agent;
}

interface AgentContextType {
  agent: Agent | null;
  isLoading: boolean;
  error: Error | null;
  refetchAgent: () => void;
  agentId: string | null;
  setAgentId: (id: string) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children, initialAgentId }: { children: React.ReactNode; initialAgentId: string }) {
  const [agentId, setAgentId] = useState<string>(initialAgentId);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['agent', agentId],
    queryFn: async () => {
      const response = await fetch(`/api/agents/${agentId}`);
      const data = await response.json();
      
      // Handle both response formats
      if ('success' in data) {
        return (data as AgentResponse).data;
      }
      
      return data as Agent;
    },
    enabled: !!agentId,
  });

  const value = {
    agent: data || null,
    isLoading,
    error,
    refetchAgent: refetch,
    agentId,
    setAgentId,
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgentContext() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}