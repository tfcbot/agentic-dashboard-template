import { mockAgents, getMockAgent } from '@/lib/mockData';
import type { 
  Agent, 
  OrderFormData, 
  IntakeSubmissionResponse, 
  GetAgentResponse,
  GetRemainingCreditsBody
} from '@/schemas';


const API_CONFIG = {
    baseUrl: process.env.NEXT_API_URL,
    version: '/v1',
    defaultHeaders: {
        'Content-Type': 'application/json'
    }
};

const getAbsoluteUrl = (path: string): string => {
    if (!API_CONFIG.baseUrl) {
        throw new Error('NEXT_API_URL is not defined');
    }

    return new URL(API_CONFIG.version + path, API_CONFIG.baseUrl).toString();
};

const getHeaders = (token: string): HeadersInit => {
    return {
        ...API_CONFIG.defaultHeaders,
        'Authorization': `Bearer ${token}`
    };
};


// Typed endpoints that take token as first parameter
export async function getCheckoutSessionId(token: string): Promise<string> {

    const absoluteUrl = getAbsoluteUrl('/checkout');
    const response = await fetch(absoluteUrl, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({
            quantity: 1,
            amount: 10
        }),
    });
    const data = await response.json();
    return data.id
}


export async function getUserCreditsRemaining(token: string): Promise<number> {
    try {
        const absoluteUrl = getAbsoluteUrl('/user/credits');
        const response = await fetch(absoluteUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        const parsedResponse = await response.json() as GetRemainingCreditsBody;
        return parsedResponse.credits; // Return the responses value or 0 if undefined
    } catch (error) {
        console.error('Error fetching responses:', error);
        return 0; // Return 0 if there's an error
    }
}


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