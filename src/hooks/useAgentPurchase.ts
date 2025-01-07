import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AgentService } from '@/services/agentService';
import type { Agent, OrderFormData, PackageTypeKey } from '@/types';

export function useAgentPurchase(agentId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch agent data
  const { data: agent, isLoading } = useQuery<Agent>({
    queryKey: ['agent', agentId],
    queryFn: async () => {
      const response = await AgentService.getAgent(agentId);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to load agent');
      }
      return response.data;
    },
  });

  // Submit purchase mutation
  const { 
    mutate: submitPurchase, 
    isLoading: isSubmitting,
    isSuccess,
    isError,
    error
  } = useMutation({
    mutationFn: async (formData: OrderFormData) => {
      // Simulate network delay for development
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await AgentService.submitIntake(formData);
      if (!response.success) {
        throw new Error(response.error || 'Failed to submit purchase');
      }
      return response;
    },
    onMutate: async (formData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['agent', agentId] });
      
      // Return context with the form data
      return { formData };
    },
    onError: (error, variables, context) => {
      console.error('Purchase submission failed:', error);
      // Optionally roll back optimistic updates
    },
    onSuccess: (data) => {
      // Show success state for 5 seconds before redirecting
      setTimeout(() => {
        router.push('/');
        // Invalidate queries after redirect
        queryClient.invalidateQueries({ queryKey: ['agent', agentId] });
      }, 5000);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['agent', agentId] });
    },
  });

  // Memoized package options
  const packageOptions = useMemo(() => {
    if (!agent || !agent.packages) return [];
    return Object.entries(agent.packages).map(([key, pkg]) => ({
      key: key as PackageTypeKey,
      ...pkg,
    }));
  }, [agent]);

  // Navigate to purchase form
  const startPurchase = (packageType: PackageTypeKey) => {
    router.push(`/agent/${agentId}/intake?package=${packageType}`);
  };

  return {
    agent,
    isLoading,
    isSubmitting,
    isSuccess,
    isError,
    error,
    packageOptions,
    startPurchase,
    submitPurchase,
  };
} 