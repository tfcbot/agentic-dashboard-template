import { useQuery } from '@tanstack/react-query';
import { AgentService } from '@/services/agentService';
import type { AgentMetadata } from '@/types';

export function useAgentMetadata(agentId: string) {
  return useQuery<AgentMetadata>({
    queryKey: ['agent-metadata', agentId],
    queryFn: async () => {
      const response = await AgentService.getAgentMetadata(agentId);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch agent metadata');
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  });
} 