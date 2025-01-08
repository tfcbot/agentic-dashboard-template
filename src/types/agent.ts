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
  credits: number;
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
  credits: number;
  available: boolean;
  keyDeliverables: string[];
  rating?: number;
  longDescription?: string;
  additionalInfo?: string;
  faq?: FAQ[];
  packages?: {
    basic: PackageType;
    standard: PackageType;
    priority: PackageType;
  };
}

/**
 * Represents the essential metadata for an agent
 */
export interface AgentMetadata {
  id: string;
  name: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  credits: number;
  rating: number;
  availability: {
    status: 'available' | 'busy' | 'offline';
    nextAvailableSlot?: string;
  };
  metrics: {
    completedTasks: number;
    averageResponseTime: string;
    satisfactionRate: number;
  };
  packages: {
    basic: PackageType;
    standard: PackageType;
    priority: PackageType;
  };
}

/**
 * Response structure for agent metadata API calls
 */
export interface AgentMetadataResponse {
  success: boolean;
  data?: AgentMetadata;
  error?: string;
}

/**
 * Valid package types for form submission
 */
export type PackageTypeKey = 'basic' | 'standard' | 'priority';

/**
 * Form data structure for the intake process
 */
export interface OrderFormData {
  description: string;
  packageType: PackageTypeKey;
  agentId: string;
}

/**
 * Possible states for the intake form
 */
export type OrderFormStatus = 'idle' | 'submitting' | 'success' | 'error';

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


/**
 * Response structure for getting all agents
 */
export interface GetAllAgentsResponse {
  success: boolean;
  agents?: Agent[];
  error?: string;
}