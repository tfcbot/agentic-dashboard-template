import { z } from "zod";

export interface Agent {
    id: string;
    name: string;
    title: string;
    description: string;
    imageUrl: string;
    startingPrice: number;
    available: boolean;
    keyDeliverables: string[];
}

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
