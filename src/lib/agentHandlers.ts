import type { OrderFormData, IntakeSubmissionResponse } from '@/schemas/agent';
import { AgentService } from '@/services/agentService';
import type { 
    RequestWebsiteReviewBody,
    GetAllAgentsResponse} from '@/schemas';

export type AgentSubmissionHandler = (token: string, data: OrderFormData) => Promise<IntakeSubmissionResponse>;

// Define known agent IDs as constants to avoid typos
export const AGENT_IDS = {
  LANDING_PAGE_REVIEWER: 'website-review',
  COPYWRITING: 'copywriting',
  VOICE_CODING: 'voice-agent'
}

export const agentSubmissionHandlers: Record<string, AgentSubmissionHandler> = {
    [AGENT_IDS.LANDING_PAGE_REVIEWER]: async (token: string, data: OrderFormData) => {
    console.log('Landing Page Reviewer Submission:', data);
    return AgentService.requestWebsiteReview(token, data.payload.formData as RequestWebsiteReviewBody);
  },
};