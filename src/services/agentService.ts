import { getMockAgent, getAllMockAgents } from '@/lib/mockData';
import type { Agent, AgentResponse, OrderFormData, 
    IntakeSubmissionResponse, GetAgentResponse } from '@/schemas';
import { api } from './api';


export interface IAgentService {
  getAgent(id: string): Promise<GetAgentResponse>;
  getAllAgents(): Promise<{ success: boolean; data?: Agent[]; error?: string }>;
  submitIntake(data: OrderFormData): Promise<IntakeSubmissionResponse>;
}

export const AgentService = {
    getAgent: (id: string): Promise<GetAgentResponse> => api.getAgent(id),
    getAllAgents: () => api.getAllAgents(),
    submitIntake: (data: OrderFormData) => api.submitIntake(data)
};