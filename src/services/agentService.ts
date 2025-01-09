import { getMockAgent, getAllMockAgents } from '@/lib/mockData';
import type { Agent, AgentResponse, OrderFormData, 
    IntakeSubmissionResponse, GetAgentResponse, 
    RequestWebsiteReviewBody,
    GetAllAgentsResponse} from '@/schemas';
import { apiService } from './api';


export interface IAgentService {
  getAgent(id: string): Promise<GetAgentResponse>;
  getAllAgents(): Promise<{ success: boolean; data?: Agent[]; error?: string }>;
  submitIntake(data: OrderFormData): Promise<IntakeSubmissionResponse>;
}

export const AgentService = {
    getAgent: (token: string, agentId: string): Promise<GetAgentResponse> => apiService.getAgent(token, agentId),
    getAllAgents: (token: string): Promise<GetAllAgentsResponse> => apiService.getAllAgents(token),
    requestWebsiteReview: (token: string, data: RequestWebsiteReviewBody) => apiService.requestWebsiteReview(token, data) 
};