import {z} from 'zod';
import { HttpResponseParams, HttpStatusCode, createHttpResponse, HttpResponses } from "@schemas/http";
import {  WebsiteReviewSchema } from '@schemas/agent';
import { GetRemainingCreditsOutput } from '@schemas/billing';
import { GetWebsiteReviewsResponseBody } from '@schemas/api';
import { DeliverableContentSchema } from './deliverable';


export const WebsiteReviewRequestReceivedResponseBodySchema = z.object({
    reviewId: z.string(),
    url: z.string(),
});

export const UserWebsiteReviewsResponseBodySchema = z.object({
    reviews: z.array(WebsiteReviewSchema),
});

export const UserRemainingCreditsResponseBodySchema = z.object({
    remainingCredits: z.number(),
});

export const OrderResponseBodySchema = z.object({
  orderId: z.string(),
  orderStatus: z.string(),
  orderCreatedAt: z.string(),
  agentName: z.string(),
  deliverableName: z.string(),
});

export const DeliverableResponseBodySchema = z.object({
  deliverableId: z.string(),
  deliverableTitle: z.string(),
  deliverableContent: DeliverableContentSchema, 
});

export const GetOrdersResponseBodySchema = z.object({
  data: z.array(OrderResponseBodySchema),
});

export const GetDeliverableResponseBodySchema = z.object({
  data: DeliverableResponseBodySchema,
});


export type WebsiteReviewRequestReceivedResponseBody = z.infer<typeof WebsiteReviewRequestReceivedResponseBodySchema>;
export type UserWebsiteReviewsResponseBody = z.infer<typeof UserWebsiteReviewsResponseBodySchema>;
export type UserRemainingCreditsResponseBody = z.infer<typeof UserRemainingCreditsResponseBodySchema>;
export type OrderResponseBody = z.infer<typeof OrderResponseBodySchema>;
export type DeliverableResponseBody = z.infer<typeof DeliverableResponseBodySchema>;
export type GetOrdersResponseBody = z.infer<typeof GetOrdersResponseBodySchema>;
export type GetDeliverableResponseBody = z.infer<typeof GetDeliverableResponseBodySchema>;


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
    GetDeliverableResponse: (params: HttpResponseParams<GetDeliverableResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
    GetOrdersResponse: (params: HttpResponseParams<GetOrdersResponseBody>) => 
      createHttpResponse(HttpStatusCode.OK, params),
  };  
  