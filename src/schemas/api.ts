import { z } from "zod";
import { 
    AgentConfigSchema, 
    WebsiteReviewSchema,
} from "@/schemas/agent";


export const GetRemainingCreditsBodySchema = z.object({
    credits: z.number(),
});

export const StripeCheckoutSessionSchema = z.object({
    url: z.string(),
    sessionId: z.string(),
});

export const StripeBillingPortalSessionSchema = z.object({
    url: z.string(),
});

export const ApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.unknown(),
    error: z.string().optional(),
});

export const GetAgentResponseSchema = z.object({
    agent: AgentConfigSchema,
});


export const RequestWebsiteReviewResponseBodySchema = z.object({
    success: z.boolean(),
    data: z.object({
        reviewId: z.string(),
    }),
    error: z.string().optional(),
});

export const UserRemainingCreditsResponseBodySchema = z.object({
    remainingCredits: z.number(),
});

export const RequestWebsiteReviewBodySchema = z.object({
    url: z.string(),
});


export const GetWebsiteReviewsResponseBodySchema = z.object({
    reviews: z.object({
        reviewId: z.string(),
        review: WebsiteReviewSchema,
    }),
});

export const RequestResearchBodySchema = z.object({
    topic: z.string(),
});

export const RequestVoiceRepurposeBodySchema = z.object({
    audioTranscript: z.string(),
});

export const RequestResearchResponseBodySchema = z.object({
    researchId: z.string(),
});

export const RequestVoiceRepurposeResponseBodySchema = z.object({
    voiceRepurposeId: z.string(),
});

export type RequestWebsiteReviewBody = z.infer<typeof RequestWebsiteReviewBodySchema>;
export type RequestWebsiteReviewResponseBody = z.infer<typeof RequestWebsiteReviewResponseBodySchema>;
export type RequestResearchBody = z.infer<typeof RequestResearchBodySchema>;
export type RequestResearchResponseBody = z.infer<typeof RequestResearchResponseBodySchema>;
export type RequestVoiceRepurposeBody = z.infer<typeof RequestVoiceRepurposeBodySchema>;
export type RequestVoiceRepurposeResponseBody = z.infer<typeof RequestVoiceRepurposeResponseBodySchema>;
export type UserRemainingCreditsResponseBody = z.infer<typeof UserRemainingCreditsResponseBodySchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type GetRemainingCreditsBody = z.infer<typeof GetRemainingCreditsBodySchema>;
export type StripeCheckoutSession = z.infer<typeof StripeCheckoutSessionSchema>;
export type StripeBillingPortalSession = z.infer<typeof StripeBillingPortalSessionSchema>;
export type GetAgentResponse = z.infer<typeof GetAgentResponseSchema>;
export type GetWebsiteReviewsResponseBody = z.infer<typeof GetWebsiteReviewsResponseBodySchema>;





