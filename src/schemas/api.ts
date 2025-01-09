import { z } from "zod";
import { 
    AgentSchema, 
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
    success: z.boolean(),
    data: AgentSchema,
    error: z.string().optional(),
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



export type RequestWebsiteReviewBody = z.infer<typeof RequestWebsiteReviewBodySchema>;
export type RequestWebsiteReviewResponseBody = z.infer<typeof RequestWebsiteReviewResponseBodySchema>;
export type UserRemainingCreditsResponseBody = z.infer<typeof UserRemainingCreditsResponseBodySchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type GetRemainingCreditsBody = z.infer<typeof GetRemainingCreditsBodySchema>;
export type StripeCheckoutSession = z.infer<typeof StripeCheckoutSessionSchema>;
export type StripeBillingPortalSession = z.infer<typeof StripeBillingPortalSessionSchema>;
export type GetAgentResponse = z.infer<typeof GetAgentResponseSchema>;
export type GetWebsiteReviewsResponseBody = z.infer<typeof GetWebsiteReviewsResponseBodySchema>;




