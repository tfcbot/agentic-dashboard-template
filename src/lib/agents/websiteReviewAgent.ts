import { AgentConfig, OrderFormData, RequestWebsiteReviewBody } from '@/schemas';
import { agentService } from '@/services/agentService';

export const websiteReviewAgent: AgentConfig = {
  id: '6f9619ff-8b86-d011-b42d-00c04fc964ff',
  name: 'Website Analysis Agent',
  title: 'Website Analysis Expert',
  description: 'Specialized in analyzing websites and providing insights',
  imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
  credits: 2500,
  available: true,
  rating: 4.8,
  category: 'Business',
  keyDeliverables: [
    'Suggestions for improvement',
    'Copywriting Review',
    "Scorecard of the website's performance"
  ],
  longDescription: 'Comprehensive strategic planning services...',
  additionalInfo: 'Available for both short-term and long-term engagements',
  faq: [
    {
      question: 'What is your typical process?',
      answer: 'We begin with a thorough analysis of your current position...'
    }
  ],
  fields: {
    url: {
      label: 'Website URL',
      type: 'text',
      placeholder: 'Enter the URL...',
      validation: { min: 10, max: 999 },
      required: true
    }
  },
  packages: {
    basic: {
      name: 'Basic Strategy',
      credits: 2500,
      features: ['Initial consultation', 'Basic market analysis'],
      deliveryTime: '1 hour',
      requiredFields: ['url'],
      optionalFields: []
    },
    standard: {
      name: 'Standard Strategy',
      credits: 5000,
      features: ['Everything in Basic', 'Detailed implementation plan'],
      deliveryTime: '1 hour',
      requiredFields: ['url'],
      optionalFields: []
    },
    priority: {
      name: 'Priority Strategy',
      credits: 10000,
      features: ['Everything in Standard', '24/7 support'],
      deliveryTime: '1 hour',
      requiredFields: ['description'],
      optionalFields: []
    }
  },
  // The handler method calls the corresponding AgentService function
  handler: async (token: string, data: OrderFormData) => {
    return agentService.handleWebsiteReviewSubmission(
      token,
      data.payload.formData as RequestWebsiteReviewBody
    );
  }
};