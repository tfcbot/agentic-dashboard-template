import { z } from 'zod';
import { DeliverableConfigSchema } from './deliverable';
import { OrderResponseBody } from './http-responses';


export const AgentFieldConfig = z.object({
  type: z.enum(['text', 'textarea', 'select', 'number', 'email', 'url']),
  label: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean().default(true),
  options: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
    customError: z.string().optional()
  }).optional()
});

export const FAQSchema = z.object({
  question: z.string(),
  answer: z.string()
});

export const AgentConfigSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  imageUrl: z.string(),
  credits: z.number(),
  available: z.boolean(),
  keyDeliverables: z.array(z.string()),
  rating: z.number().optional(),
  longDescription: z.string().optional(),
  additionalInfo: z.string().optional(),
  fields: z.record(z.string(), AgentFieldConfig),
  faq: z.array(FAQSchema),
  deliverable: DeliverableConfigSchema,
  handler: z.function()
    .args(z.string(), z.custom<OrderFormData>())
    .returns(z.promise(z.custom<OrderResponseBody>()))
});

export const OrderFormDataSchema = z.object({
  payload: z.object({
    formData: z.object({})
  }),
  agentId: z.string()
});

export const OrderFormStatusSchema = z.enum(['idle', 'submitting', 'success', 'error']);

/**
 * Response structure for agent API calls
 */
export const AgentResponseSchema = z.object({
  success: z.boolean(),
  data: AgentConfigSchema,
  error: z.string().optional()
});

/**
 * Response structure for intake form submission
 */
export const IntakeSubmissionResponseSchema = z.object({
  success: z.boolean(),
  orderId: z.string().optional(),
  error: z.string().optional()
});

/**
 * Response structure for getting all agents
 */
export const GetAllAgentsResponseSchema = z.object({
  agents: z.array(AgentConfigSchema).optional(),
});

export const WebsiteReviewSchema = z.object({
  userId: z.string(),
  websiteUrl: z.string(),
  createdAt: z.string(),
  copywriting_analysis: z.object({
      headline_effectiveness: z.object({
          clarity: z.string(),
          benefit_focused: z.string(),
          urgency_factor: z.string(),
          emotional_appeal: z.number().min(0).max(10)
      }),
      value_proposition: z.object({
          unique_selling_points: z.array(z.string()),
          benefit_clarity: z.string(),
          pain_point_addressing: z.string()
      }),
      persuasion_elements: z.object({
          social_proof: z.string(),
          credibility_indicators: z.string(),
          risk_reducers: z.string()
      }),
      call_to_action: z.object({
          clarity: z.string(),
          placement: z.string(),
          compelling_factor: z.string()
      }),
      content_engagement: z.object({
          readability: z.string(),
          scannability: z.string(),
          emotional_triggers: z.array(z.string())
      }),
      conversion_optimization: z.object({
          friction_points: z.array(z.string()),
          trust_elements: z.string()
      }),
      recommendations: z.array(z.string())
  }),
});

export const GetWebsiteReviewsInputSchema = z.object({
  userId: z.string(),
  websiteUrl: z.string()
});


export const GetWebsiteReviewsOutputSchema = z.object({
  reviews: z.array(WebsiteReviewSchema)
});

export const PayloadSchema = z.object({
  formData: z.object({})
});

export const ValueStrategistRequestSchema = z.object({
  applicationIdea: z.string()
}); 

// Export types
export type FAQ = z.infer<typeof FAQSchema>;
export type AgentConfig = z.infer<typeof AgentConfigSchema>;
export type OrderFormData = z.infer<typeof OrderFormDataSchema>;
export type OrderFormStatus = z.infer<typeof OrderFormStatusSchema>;
export type AgentResponse = z.infer<typeof AgentResponseSchema>;
export type IntakeSubmissionResponse = z.infer<typeof IntakeSubmissionResponseSchema>;
export type GetAllAgentsResponse = z.infer<typeof GetAllAgentsResponseSchema>;
export type Payload = z.infer<typeof PayloadSchema>;
export type ValueStrategistRequest = z.infer<typeof ValueStrategistRequestSchema>;