import { mockAgents, getMockAgent } from '@/lib/mockData';
import type { Agent, AgentResponse, OrderFormData, IntakeSubmissionResponse, GetAgentResponse } from '@/schemas';

// API layer - simulates actual API calls
export const api = {
  async getAgent(id: string): Promise<GetAgentResponse> {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const agent = getMockAgent(id);
      return { success: true, data: agent };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return {  
        success: false,
        data: {} as Agent,
        error: errorMessage
      };
    }
  },

  async getAllAgents(): Promise<{ success: boolean; data?: Agent[]; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const agents = Object.values(mockAgents);
      return { success: true, data: agents };
    } catch (error) {
      return { success: false, error: 'Failed to fetch agents' };
    }
  },

  async submitIntake(data: OrderFormData): Promise<IntakeSubmissionResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, orderId: 'mock-order-id' };
  },

    getAgentMetadata: async (agentId: string): Promise<Agent> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const mockAgent = getMockAgent(agentId);
      return mockAgent;
    } catch (error) {
      throw new Error('Failed to fetch agent metadata');
    }
  }
};