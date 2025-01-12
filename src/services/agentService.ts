import type {
  GetAgentResponse,
  RequestWebsiteReviewBody,
  GetAllAgentsResponse,
  RequestResearchBody,
  RequestWebsiteReviewResponseBody,
  RequestResearchResponseBody,
  ValueStrategistRequest
} from '@/schemas';
import { apiService } from './api';
import { getAgent, getAllAgents } from '@/lib/agents';
import { OrderResponseBody } from '@/schemas/http-responses';
export interface IAgentService {
  getAgent(id: string): Promise<GetAgentResponse>;
  getAllAgents(): Promise<GetAllAgentsResponse>;
  handleWebsiteReviewSubmission(token: string, data: RequestWebsiteReviewBody): Promise<RequestWebsiteReviewResponseBody>;
  handleResearchSubmission(token: string, data: RequestResearchBody): Promise<RequestResearchResponseBody>;
  handleValueStrategistRequest(token: string, data: ValueStrategistRequest): Promise<OrderResponseBody>;
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
  async handleValueStrategistRequest(token: string, data: ValueStrategistRequest): Promise<OrderResponseBody> {
    return apiService.requestValueStrategist(token, data);
  }
};

export const agentService = new AgentService();