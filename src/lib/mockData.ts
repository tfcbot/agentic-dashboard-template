import { Agent } from '@/schemas';

export const mockAgents: Record<string, Agent> = {
  'agent-1': {
    id: 'agent-1',
    name: 'Strategic Planning Consultant',
    title: 'Business Strategy Expert',
    description: 'Specialized in developing comprehensive business strategies',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    credits: 2500,  
    available: true,
    rating: 4.8,
    keyDeliverables: [
      'Strategic plan development',
      'Market analysis',
      'Competitive positioning'
    ],
    faq: [
      {
        question: 'What is your typical process?',
        answer: 'We begin with a thorough analysis of your current position...'
      }
    ],
    longDescription: 'Comprehensive strategic planning services...',
    additionalInfo: 'Available for both short-term and long-term engagements',
    category: 'Business',
    fields: {},
    packages: {
      basic: {
        name: 'Basic Strategy',
        credits: 2500,
        features: ['Initial consultation', 'Basic market analysis'],
        deliveryTime: '1 hour',
        requiredFields: ['description'],
        optionalFields: []
      },
      standard: {
        name: 'Standard Strategy',
        credits: 5000,
        features: ['Everything in Basic', 'Detailed implementation plan'],
        deliveryTime: '1 hour',
        requiredFields: ['description'],
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
    }
  },
  // Add other agents following the same structure...
};

// Helper function to get agent by ID
export const getMockAgent = (id: string): Agent => {
  const idMap: Record<string, string> = {
    'strategic-planning-consultant': 'agent-1',
    'creative-copywriter': 'agent-2',
    'data-analytics-specialist': 'agent-3'
  };

  const actualId = idMap[id] || id;
  return mockAgents[actualId] || mockAgents['agent-1'];
};

// Helper function to get all agents
export const getAllMockAgents = (): Agent[] => {
  return Object.values(mockAgents);
}; 