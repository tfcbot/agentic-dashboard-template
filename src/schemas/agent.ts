import { z } from 'zod';


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

export const AgentPackageConfigSchema = z.object({
  name: z.string(),
  credits: z.number(),
  deliveryTime: z.string(),
  features: z.array(z.string()),
  requiredFields: z.array(z.string()), // Fields required for this package
  optionalFields: z.array(z.string())  // Optional fields for this package
});





/**
 * Represents a single FAQ item
 */
export const FAQSchema = z.object({
  question: z.string(),
  answer: z.string()
});

/**
 * Represents a package type with its features and pricing
 */
export const PackageTypeSchema = z.object({
  name: z.string(),
  credits: z.number(),
  deliveryTime: z.string(),
  features: z.array(z.string())
});

/**
 * Represents the complete agent data structure
 */
export const AgentSchema = z.object({
  id: z.string(),
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
  packages: z.object({
    basic: AgentPackageConfigSchema,
    standard: AgentPackageConfigSchema, 
    priority: AgentPackageConfigSchema
  })
});


/**
 * Valid package types for form submission
 */
export const PackageTypeKeySchema = z.enum(['basic', 'standard', 'priority']);

/**
 * Form data structure for the intake process
 */
export const OrderFormDataSchema = z.object({
  description: z.string(),
  packageType: PackageTypeKeySchema,
  agentId: z.string()
});

/**
 * Possible states for the intake form
 */
export const OrderFormStatusSchema = z.enum(['idle', 'submitting', 'success', 'error']);

/**
 * Response structure for agent API calls
 */
export const AgentResponseSchema = z.object({
  success: z.boolean(),
  data: AgentSchema,
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
  success: z.boolean(),
  agents: z.array(AgentSchema).optional(),
  error: z.string().optional()
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



// Export types
export type FAQ = z.infer<typeof FAQSchema>;
export type PackageType = z.infer<typeof PackageTypeSchema>;
export type Agent = z.infer<typeof AgentSchema>;
export type PackageTypeKey = z.infer<typeof PackageTypeKeySchema>;
export type OrderFormData = z.infer<typeof OrderFormDataSchema>;
export type OrderFormStatus = z.infer<typeof OrderFormStatusSchema>;
export type AgentResponse = z.infer<typeof AgentResponseSchema>;
export type IntakeSubmissionResponse = z.infer<typeof IntakeSubmissionResponseSchema>;
export type GetAllAgentsResponse = z.infer<typeof GetAllAgentsResponseSchema>;
export type AgentPackageConfig = z.infer<typeof AgentPackageConfigSchema>;
