
import { useQuery } from '@tanstack/react-query';
import { AgentService } from '@/services/agentService';
import { useAuth } from '@clerk/nextjs';


export function useAgents() {
  const { getToken } = useAuth();
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('No token available');
      const response = await AgentService.getAllAgents(token);
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch agents');
      }
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
  const { getToken } = useAuth();
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['agent', agentId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('No token available');
      const response = await AgentService.getAgent(token, agentId);
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