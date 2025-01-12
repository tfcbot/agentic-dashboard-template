import type {
  AgentConfig, OrderFormData,
  IntakeSubmissionResponse, GetAgentResponse,
  RequestWebsiteReviewBody,
  GetAllAgentsResponse,
  RequestResearchBody,
  RequestVoiceRepurposeBody,
  RequestWebsiteReviewResponseBody,
  RequestResearchResponseBody,
  RequestVoiceRepurposeResponseBody
} from '@/schemas';
import { apiService } from './api';
import { getAgent, getAllAgents } from '@/lib/agents';

export interface IAgentService {
  getAgent(id: string): Promise<GetAgentResponse>;
  getAllAgents(): Promise<GetAllAgentsResponse>;
  handleWebsiteReviewSubmission(token: string, data: RequestWebsiteReviewBody): Promise<RequestWebsiteReviewResponseBody>;
  handleResearchSubmission(token: string, data: RequestResearchBody): Promise<RequestResearchResponseBody>;
  handleVoiceRepurposeSubmission(token: string, data: RequestVoiceRepurposeBody): Promise<RequestVoiceRepurposeResponseBody>;
}

export class AgentService implements IAgentService {
  async getAgent(agentId: string): Promise<GetAgentResponse> {
    const agent = getAgent(agentId);
    if (!agent) {
      throw new Error('Agent not found');
    }
    return { agent: agent };
  }

  async getAllAgents(): Promise<GetAllAgentsResponse> {
    const agents = getAllAgents();
    return { agents: agents };
  }

  async handleWebsiteReviewSubmission(token: string, data: RequestWebsiteReviewBody): Promise<RequestWebsiteReviewResponseBody> {
    return apiService.requestWebsiteReview(token, data);
  }
  async handleResearchSubmission(token: string, data: RequestResearchBody): Promise<RequestResearchResponseBody> {
    return apiService.requestResearch(token, data);
  }
  async handleVoiceRepurposeSubmission(token: string, data: RequestVoiceRepurposeBody): Promise<RequestVoiceRepurposeResponseBody> {
    return apiService.requestVoiceRepurpose(token, data);
  }
};

export const agentService = new AgentService();