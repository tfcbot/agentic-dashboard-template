'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Agent, OrderFormData, OrderFormStatus, IntakeSubmissionResponse } from '@/types';
import { AgentService } from '@/services/agentService';

interface AgentContextType {
  agent: Agent | null;
  loading: boolean;
  error: Error | null;
  status: OrderFormStatus;
  submitIntake: (formData: OrderFormData) => Promise<IntakeSubmissionResponse>;
  resetError: () => void;
  loadAgent: (id: string) => Promise<void>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

interface AgentProviderProps {
  children: React.ReactNode;
  initialAgentId: string;
}

export function AgentProvider({ children, initialAgentId }: AgentProviderProps) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<OrderFormStatus>('idle');

  useEffect(() => {
    loadAgent(initialAgentId);
  }, [initialAgentId]);

  const loadAgent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AgentService.getAgent(id);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to load agent');
      }
      setAgent(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const submitIntake = async (formData: OrderFormData) => {
    setStatus('submitting');
    setError(null);
    try {
      const response = await AgentService.submitIntake(formData);
      if (!response.success) {
        throw new Error(response.error || 'Failed to submit intake form');
      }
      setStatus('success');
      return response;
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      throw err;
    }
  };

  const resetError = () => {
    setError(null);
    setStatus('idle');
  };

  const value = {
    agent,
    loading,
    error,
    status,
    submitIntake,
    resetError,
    loadAgent,
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
} 