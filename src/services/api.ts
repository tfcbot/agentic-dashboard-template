import { getMockWebsiteReviews } from '@/lib/mockData';
import type {
  RequestWebsiteReviewBody,
  RequestWebsiteReviewResponseBody,
  GetAgentResponse,
  GetRemainingCreditsBody,
  GetWebsiteReviewsResponseBody,
  RequestVoiceRepurposeBody,
  RequestResearchResponseBody,
  RequestResearchBody,
  RequestVoiceRepurposeResponseBody,
  OnboardingDTO,
} from '@/schemas/api';

import { AgentConfig, GetAllAgentsResponse, RequestValueStrategyInput, RequestGrowthStrategyInput, RequestTechStrategyInput, RequestEmailSequenceInput } from '@/schemas/agent';
const API_CONFIG = {
  baseUrl: process.env.NEXT_API_URL,
  version: '/v1',
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
};

import { GetDeliverableResponseBody, GetOrdersResponseBody, OrderResponseBody } from '@/schemas/http-responses';

// Typed endpoints that take token as first paramete

export interface IApiService {
  getAbsoluteUrl(path: string): string;
  getHeaders(token: string): HeadersInit;
  requestWebsiteReview(token: string, body: RequestWebsiteReviewBody): Promise<RequestWebsiteReviewResponseBody>; 
  getUserWebsiteReviews(token: string): Promise<GetWebsiteReviewsResponseBody>;
  getCheckoutSessionId(token: string): Promise<string>;
  getUserCreditsRemaining(token: string): Promise<number>;
  requestResearch(token: string, body: RequestResearchBody): Promise<RequestResearchResponseBody>;
  requestVoiceRepurpose(token: string, body: RequestVoiceRepurposeBody): Promise<RequestVoiceRepurposeResponseBody>;
  getOrders(token: string): Promise<GetOrdersResponseBody>;
  getDeliverable(token: string, orderId: string): Promise<GetDeliverableResponseBody>;
  requestGrowthStrategy(token: string, body: RequestGrowthStrategyInput): Promise<OrderResponseBody>;
  requestTechStrategy(token: string, body: RequestTechStrategyInput): Promise<OrderResponseBody>;
  requestValueStrategy(token: string, body: RequestValueStrategyInput): Promise<OrderResponseBody>;
  requestEmailSequence(token: string, body: RequestEmailSequenceInput): Promise<OrderResponseBody>;
}


export class ApiService implements IApiService {
  
  getAbsoluteUrl(path: string): string {
    if (!API_CONFIG.baseUrl) {
      throw new Error('NEXT_API_URL is not defined');
    }
    return new URL(API_CONFIG.version + path, API_CONFIG.baseUrl).toString();
  };
  
  getHeaders(token: string): HeadersInit {
    return {
      ...API_CONFIG.defaultHeaders,
      'Authorization': `Bearer ${token}`
    };
  };
  

  async getCheckoutSessionId(token: string): Promise<string> {

    const absoluteUrl = this.getAbsoluteUrl('/checkout');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({
        quantity: 1,
        amount: 1
      }),
    });
    const data = await response.json();
    return data.id
  }


  async getUserCreditsRemaining(token: string): Promise<number> {
    try {
      const absoluteUrl = this.getAbsoluteUrl('/user/credits');
      const response = await fetch(absoluteUrl, {
        method: 'GET',
        headers: this.getHeaders(token),
      });
      const data = await response.json();
      return data.credits;
    } catch (error) {
      console.error('Error fetching responses:', error);
      return 0; // Return 0 if there's an error
    }
  }

  async getUserWebsiteReviews(token: string): Promise<GetWebsiteReviewsResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/landing-page-review/deliverables');
    const response = await fetch(absoluteUrl, {
      method: 'GET',
      headers: this.getHeaders(token),
    });
   // const data = await response.json();
    const reviews = await getMockWebsiteReviews();
    return reviews;
  }

  async requestWebsiteReview(token: string, body: RequestWebsiteReviewBody): Promise<RequestWebsiteReviewResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/landing-page-review');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(body),
    });
   const data = await response.json();
 
  
    return { success: true, data: data };
  }

  async requestResearch(token: string, body: RequestResearchBody): Promise<RequestResearchResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/research');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(body),
    });
    return { researchId: 'mock-research-id' };
  }

  async requestVoiceRepurpose(token: string, body: RequestVoiceRepurposeBody): Promise<RequestVoiceRepurposeResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/voice-repurpose');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(body),
    });
    return { voiceRepurposeId: 'mock-voice-repurpose-id' };
  }

  async requestValueStrategy(token: string, body: RequestValueStrategyInput): Promise<OrderResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/value-strategy');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(body),
    });
    const data = await response.json() as OrderResponseBody;
    return data;
  }

  async getOrders(token: string): Promise<GetOrdersResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/orders');
    const response = await fetch(absoluteUrl, {
      method: 'GET',
      headers: this.getHeaders(token),
    });
    const data = await response.json() as GetOrdersResponseBody;
    return data;
  }

  async getDeliverable(token: string, orderId: string): Promise<GetDeliverableResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl(`/orders/deliverables/${orderId}`);
    const response = await fetch(absoluteUrl, {
      method: 'GET',
      headers: this.getHeaders(token),
    });
    return response.json() as Promise<GetDeliverableResponseBody>;
  }

  async requestGrowthStrategy(token: string, body: RequestGrowthStrategyInput): Promise<OrderResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/growth-strategy');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(body),
    });
    return response.json() as Promise<OrderResponseBody>;
  }

  async requestTechStrategy(token: string, body: RequestTechStrategyInput): Promise<OrderResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/tech-strategy');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(body),
    });
    return response.json() as Promise<OrderResponseBody>;
  }

  async requestEmailSequence(token: string, body: RequestEmailSequenceInput): Promise<OrderResponseBody> {
    const absoluteUrl = this.getAbsoluteUrl('/email-sequence');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(body),
    });
    return response.json() as Promise<OrderResponseBody>;
  }

  async updateUserOnboardingStatus(token: string, body: OnboardingDTO): Promise<void> {
    const absoluteUrl = this.getAbsoluteUrl('/onboard-user');
    const response = await fetch(absoluteUrl, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(body),
    });
    return response.json()
  }
}

export const apiService = new ApiService();
