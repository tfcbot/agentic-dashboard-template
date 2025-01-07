import { z } from "zod";

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

export type GetRemainingCreditsBody = z.infer<typeof GetRemainingCreditsBodySchema>;
export type StripeCheckoutSession = z.infer<typeof StripeCheckoutSessionSchema>;
export type StripeBillingPortalSession = z.infer<typeof StripeBillingPortalSessionSchema>; 