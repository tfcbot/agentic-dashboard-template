/**
 * Represents a single FAQ item
 */
export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Represents a package type with its features and pricing
 */
export interface PackageType {
  name: string;
  price: number;
  deliveryTime: string;
  features: string[];
}

/**
 * Represents the complete agent data structure
 */
export interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  available: boolean;
  keyDeliverables: string[];
  rating: number;
  longDescription: string;
  additionalInfo: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  packages: {
    basic: PackageType;
    standard: PackageType;
    priority: PackageType;
  };
}

/**
 * Valid package types for form submission
 */
export type PackageTypeKey = 'basic' | 'standard' | 'priority';

/**
 * Form data structure for the intake process
 */
export interface IntakeFormData {
  description: string;
  schedule: string;
  access: string[];
  packageType: PackageTypeKey;
  agentId: string;
}

/**
 * Possible states for the intake form
 */
export type IntakeFormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Response structure for agent API calls
 */
export interface AgentResponse {
  success: boolean;
  data?: Agent;
  error?: string;
}

/**
 * Response structure for intake form submission
 */
export interface IntakeSubmissionResponse {
  success: boolean;
  orderId?: string;
  error?: string;
} 