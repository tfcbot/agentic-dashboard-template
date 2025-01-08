import { z } from "zod";
import { AgentSchema, GetWebsiteReviewsInputSchema, GetWebsiteReviewsOutputSchema, WebsiteReviewSchema } from "@/schemas/agent";


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


export const WebsiteReviewRequestReceivedResponseBody = z.object({
    reviewId: z.string(),
    url: z.string(),
});



export const UserWebsiteReviewsResponseBody = z.object({
    reviews: z.array(WebsiteReviewSchema),
});

export const UserRemainingCreditsResponseBody = z.object({
    remainingCredits: z.number(),
});

export type WebsiteReviewRequestReceivedResponseBody = z.infer<typeof WebsiteReviewRequestReceivedResponseBody>;
export type UserWebsiteReviewsResponseBody = z.infer<typeof UserWebsiteReviewsResponseBody>;
export type UserRemainingCreditsResponseBody = z.infer<typeof UserRemainingCreditsResponseBody>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type GetRemainingCreditsBody = z.infer<typeof GetRemainingCreditsBodySchema>;
export type StripeCheckoutSession = z.infer<typeof StripeCheckoutSessionSchema>;
export type StripeBillingPortalSession = z.infer<typeof StripeBillingPortalSessionSchema>;
export type GetAgentResponse = z.infer<typeof GetAgentResponseSchema>;
export type GetWebsiteReviewsInput = z.infer<typeof GetWebsiteReviewsInputSchema>;
export type GetWebsiteReviewsOutput = z.infer<typeof GetWebsiteReviewsOutputSchema>;




