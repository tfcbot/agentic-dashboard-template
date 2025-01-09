
import { useQuery } from '@tanstack/react-query';
import { AgentService } from '@/services/agentService';


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


export function useAgent(agentId: string) {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['agent', agentId],
    queryFn: async () => {
      const response = await AgentService.getAgent(agentId);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch agent');
      }
      return response.data;
    }
  });

  return {
    agent: data,
    loading,
    error
  };
}