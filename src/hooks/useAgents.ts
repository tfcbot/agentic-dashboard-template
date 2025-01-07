import { useQuery } from '@tanstack/react-query';
import { AgentService } from '@/services/agentService';
import type { Agent } from '@/types';

export function useAgents() {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const response = await AgentService.getAllAgents();
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch agents');
      }
      return response.data;
    }
  });

  return {
    agents: data || [],
    loading,
    error
  };
} 