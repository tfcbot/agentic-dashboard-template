import type {
  GetAgentResponse,
  GetAllAgentsResponse,
  RequestGrowthStrategyInput,
  RequestTechStrategyInput,
  RequestValueStrategyInput,
  RequestEmailSequenceInput
} from '@/schemas';
import { apiService } from './api';
import { getAgent, getAllAgents } from '@/lib/agents';
import { OrderResponseBody } from '@/schemas/http-responses';


export interface IAgentService {
  getAgent(id: string): Promise<GetAgentResponse>;
  getAllAgents(): Promise<GetAllAgentsResponse>;
  handleValueStrategyRequest(token: string, data: RequestValueStrategyInput): Promise<OrderResponseBody>;
  handleGrowthStrategyRequest(token: string, data: RequestGrowthStrategyInput): Promise<OrderResponseBody>;
  handleTechStrategyRequest(token: string, data: RequestTechStrategyInput): Promise<OrderResponseBody>;
  handleEmailSequenceRequest(token: string, data: RequestEmailSequenceInput): Promise<OrderResponseBody>;
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

  async handleValueStrategyRequest(token: string, data: RequestValueStrategyInput): Promise<OrderResponseBody> {
    return apiService.requestValueStrategy(token, data);
  }
  async handleGrowthStrategyRequest(token: string, data: RequestGrowthStrategyInput): Promise<OrderResponseBody> {
    return apiService.requestGrowthStrategy(token, data);
  }
  async handleTechStrategyRequest(token: string, data: RequestTechStrategyInput): Promise<OrderResponseBody> {
    return apiService.requestTechStrategy(token, data);
  }
  async handleEmailSequenceRequest(token: string, data: RequestEmailSequenceInput): Promise<OrderResponseBody> {
    return apiService.requestEmailSequence(token, data);
  }
};

export const agentService = new AgentService();