import { useQuery } from '@tanstack/react-query';
import { agentService } from '@/services/agentService';


export function useAgents() {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const response = await agentService.getAllAgents();
      return response.agents;
    }
  });

  return {
    data,
    loading,
    error
  };
} 


export function useAgent(agentId: string) {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['agent', agentId],
    queryFn: async () => {
      const response = await agentService.getAgent(agentId);
      if (!response.agent) {
        throw new Error('Failed to fetch agent');
      }
      return response.agent;
    }
  });

  return {
    agent: data,
    loading,
    error
  };
}