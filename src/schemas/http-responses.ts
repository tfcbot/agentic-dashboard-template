import {z} from 'zod';
import { HttpResponseParams, HttpStatusCode, createHttpResponse, HttpResponses } from "@schemas/http";
import {  WebsiteReviewSchema } from '@schemas/agent';
import { GetRemainingCreditsOutput } from '@schemas/billing';
import { GetWebsiteReviewsResponseBody } from '@schemas/api';


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

export const OrderResponseBody = z.object({
    success: z.boolean(),
    orderId: z.string(),
});

export type WebsiteReviewRequestReceivedResponseBody = z.infer<typeof WebsiteReviewRequestReceivedResponseBody>;
export type UserWebsiteReviewsResponseBody = z.infer<typeof UserWebsiteReviewsResponseBody>;
export type UserRemainingCreditsResponseBody = z.infer<typeof UserRemainingCreditsResponseBody>;
export type OrderResponseBody = z.infer<typeof OrderResponseBody>;


export const ApiHttpResponses = {
    ...HttpResponses,
    WebsiteReviewRequestReceived: (params: HttpResponseParams<WebsiteReviewRequestReceivedResponseBody>) => 
      createHttpResponse(HttpStatusCode.CREATED, params),
    UserWebsiteReviews: (params: HttpResponseParams<GetWebsiteReviewsResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    UserRemainingCredits: (params: HttpResponseParams<GetRemainingCreditsOutput>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    OrderResponse: (params: HttpResponseParams<OrderResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
  };  
  