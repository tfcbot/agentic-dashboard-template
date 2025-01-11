import { Agent, GetWebsiteReviewsResponseBody, RequestWebsiteReviewResponseBody } from '@/schemas';

export const mockAgents: Record<string, Agent> = {
  'agent-1': {
    id: 'agent-1',
    name: 'Website Analysis Agent',
    title: 'Website Analysis Expert',
    description: 'Specialized in analyzing websites and providing insights',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    credits: 2500,
    available: true,
    rating: 4.8,
    keyDeliverables: [
      'Suggestions for improvement',
      'Copywriting Review',
      "Scorecard of the website's performance"
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
    fields: {
      url: {
        label: 'Website URL',
        type: 'text',
        placeholder: 'Enter the URL of the website you want to analyze...',
        validation: {
          min: 10,
          max: 1000
        },
        required: true
      },
      // Add any other fields you need
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
    }
  },
  'agent-2': {
    id: 'agent-2',
    name: 'Research Assistant',
    title: 'Research and Analysis Expert',
    description: 'Expert research and analysis across academic and business domains',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    credits: 2500,
    available: true,
    rating: 4.8,
    keyDeliverables: [
      'Comprehensive research report',
      'Data analysis',
      'Recommendations'
    ],
    faq: [
      {
        question: 'What types of research can you help with?',
        answer: 'I can assist with academic research, market research, competitive analysis, literature reviews, and data-driven insights across various fields.'
      },
      {
        question: 'What format will I receive the research in?',
        answer: 'Research is delivered in a comprehensive report format with citations, methodology, key findings, and actionable insights.'
      }
    ],
    longDescription: 'Specialized in conducting thorough research across multiple domains. From academic papers to market analysis, I help gather, analyze and synthesize information to provide valuable insights.',
    additionalInfo: 'All research includes proper citations and follows academic standards when applicable',
    category: 'Research',
    fields: {
      topic: {
        label: 'Research Topic',
        type: 'text',
        placeholder: 'Describe your research topic or question...',
        validation: {
          min: 20,
          max: 2000
        },
        required: true
      }
    },
    packages: {
      basic: {
        name: 'Basic Research',
        credits: 3000,
        features: [
          'Literature review',
          'Basic data analysis',
          'Summary report'
        ],
        deliveryTime: '2 hours',
        requiredFields: ['topic'],
        optionalFields: []
      },
      standard: {
        name: 'Comprehensive Research',
        credits: 6000,
        features: [
          'Everything in Basic',
          'In-depth analysis',
          'Detailed methodology',
          'Recommendations'
        ],
        deliveryTime: '4 hours',
        requiredFields: ['topic'],
        optionalFields: []
      },
      priority: {
        name: 'Premium Research',
        credits: 12000,
        features: [
          'Everything in Standard',
          'Priority processing',
          'Expert consultation',
          'Follow-up support'
        ],
        deliveryTime: '2 hours',
        requiredFields: ['topic'],
        optionalFields: []
      }
    }
  },
  'agent-3': {
    id: 'agent-3',
    name: 'AI Voice Coding Specialist',
    title: 'Voice-to-Specification AI Engineer',
    description: 'Transforms your voice recordings into detailed technical specifications for AI coding projects',
    category: 'Development',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    credits: 2500,
    available: true,
    keyDeliverables: [
      'Detailed technical specifications',
      'System architecture diagrams',
      'API documentation',
      'Implementation guidelines'
    ],
    rating: 4.8,
    longDescription: 'Perfect for developers who prefer verbal ideation and documentation. Our AI specialist converts your voice recordings into comprehensive technical specifications, making it easier to transform your ideas into actionable development plans.',
    additionalInfo: 'Supports multiple audio formats and can handle complex technical requirements across various AI frameworks and technologies.',
    fields: {
      projectDescription: {
        label: 'Project Description',
        type: 'textarea',
        placeholder: 'Describe your project requirements and goals...',
        validation: {
          min: 50,
          max: 2000
        },
        required: true
      },
      audioTranscript: {
        label: 'Audio Transcript',
        type: 'textarea',
        placeholder: 'Paste your audio transcript here...',
        validation: {
          min: 100,
          max: 5000
        },
        required: true
      },
      preferredFramework: {
        label: 'Preferred Framework/Technology',
        type: 'select',
        options: [
          { value: 'any', label: 'Any/Flexible' },
          { value: 'tensorflow', label: 'TensorFlow' },
          { value: 'pytorch', label: 'PyTorch' },
          { value: 'scikit', label: 'Scikit-learn' },
          { value: 'other', label: 'Other (specify in description)' }
        ],
        required: false
      }
    },
    faq: [
      {
        question: "What audio transcript format do you accept?",
        answer: "You can paste any text transcript of your voice recording. We recommend using professional transcription services or AI transcription tools for best results."
      },
      {
        question: "How detailed should my project description be?",
        answer: "The more detailed your description, the better. Include your project goals, technical requirements, constraints, and any specific preferences for implementation."
      }
    ],
    packages: {
      basic: {
        name: 'Basic Specification',
        credits: 2500,
        features: [
          'Voice recording transcription analysis',
          'Basic technical requirements',
          'High-level architecture outline',
          'Core functionality specification'
        ],
        deliveryTime: '4 hours',
        requiredFields: ['projectDescription', 'audioTranscript'],
        optionalFields: ['preferredFramework']
      },
      standard: {
        name: 'Detailed Specification',
        credits: 5000,
        features: [
          'Everything in Basic',
          'Detailed system architecture',
          'API specifications',
          'Data flow diagrams',
          'Implementation guidelines'
        ],
        deliveryTime: '8 hours',
        requiredFields: ['projectDescription', 'audioTranscript'],
        optionalFields: ['preferredFramework']
      },
      priority: {
        name: 'Premium Specification',
        credits: 10000,
        features: [
          'Everything in Standard',
          'Priority processing',
          'Interactive review session',
          'Alternative approaches analysis',
          'Risk assessment',
          'Maintenance guidelines'
        ],
        deliveryTime: '6 hours',
        requiredFields: ['projectDescription', 'audioTranscript'],
        optionalFields: ['preferredFramework']
      }
    }
  }
};


// Helper function to get agent by ID
export const getMockAgent = (id: string): Agent => {
  const idMap: Record<string, string> = {
    'website-analysis': 'agent-1',
    'research-assistant': 'agent-2',
    'voice-coding-specialist': 'agent-3'
  };

  const actualId = idMap[id] || id;

  // Return the requested agent or default to agent-1 (Website Analysis Agent) if not found
  const agent = mockAgents[actualId];
  if (!agent) {
    console.warn(`Agent with id ${id} not found, returning Website Analysis Agent`);
    return mockAgents['agent-1'];
  }
  return agent;
};

// Helper function to get all agents
export const getAllMockAgents = (): Agent[] => {
  return Object.values(mockAgents);
};


export const getMockWebsiteReview = (): GetWebsiteReviewsResponseBody => {
  return {
    reviews: {
      reviewId: 'mock-review-id',
      review: {
        userId: 'mock-user-id',
        websiteUrl: 'https://www.example.com',
        createdAt: new Date().toISOString(),
        copywriting_analysis: {
          headline_effectiveness: {
            clarity: 'The headline clearly communicates the main value proposition',
            benefit_focused: 'Strong focus on customer benefits',
            urgency_factor: 'Creates moderate sense of urgency',
            emotional_appeal: 8
          },
          value_proposition: {
            unique_selling_points: ['Innovative features', 'Cost effective', 'Easy to use'],
            benefit_clarity: 'Benefits are clearly articulated',
            pain_point_addressing: 'Effectively addresses key customer pain points'
          },
          persuasion_elements: {
            social_proof: 'Good use of testimonials and case studies',
            credibility_indicators: 'Professional certifications and awards displayed',
            risk_reducers: 'Money-back guarantee and free trial offered'
          },
          call_to_action: {
            clarity: 'CTAs are clear and action-oriented',
            placement: 'Strategically placed throughout the page',
            compelling_factor: 'Strong value proposition in CTA copy'
          },
          content_engagement: {
            readability: 'Content is easy to read and scan',
            scannability: 'Good use of headers and bullet points',
            emotional_triggers: ['Trust', 'Security', 'Success']
          },
          conversion_optimization: {
            friction_points: ['Long form fields', 'Complex navigation'],
            trust_elements: 'Strong security badges and privacy policy'
          },
          recommendations: [
            'Simplify the signup process',
            'Add more customer testimonials',
            'Improve mobile responsiveness',
            'Enhance visual hierarchy'
          ]
        }
      }
    }
  }
};



export async function getMockWebsiteReviews(): Promise<GetWebsiteReviewsResponseBody> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const reviews = {
    reviewId: 'mock-review-id',
    review: {
      userId: 'mock-user-id',
      websiteUrl: 'https://www.example.com',
      createdAt: new Date().toISOString(),
      copywriting_analysis: {
        headline_effectiveness: {
          clarity: 'The headline clearly communicates the main value proposition',
          benefit_focused: 'Strong focus on customer benefits',
          urgency_factor: 'Creates moderate sense of urgency',
          emotional_appeal: 8
        },
        value_proposition: {
          unique_selling_points: ['Innovative features', 'Cost effective', 'Easy to use'],
          benefit_clarity: 'Benefits are clearly articulated',
          pain_point_addressing: 'Effectively addresses key customer pain points'
        },
        persuasion_elements: {
          social_proof: 'Good use of testimonials and case studies',
          credibility_indicators: 'Professional certifications and awards displayed',
          risk_reducers: 'Money-back guarantee and free trial offered'
        },
        call_to_action: {
          clarity: 'CTAs are clear and action-oriented',
          placement: 'Strategically placed throughout the page',
          compelling_factor: 'Strong value proposition in CTA copy'
        },
        content_engagement: {
          readability: 'Content is easy to read and scan',
          scannability: 'Good use of headers and bullet points',
          emotional_triggers: ['Trust', 'Security', 'Success']
        },
        conversion_optimization: {
          friction_points: ['Long form fields', 'Complex navigation'],
          trust_elements: 'Strong security badges and privacy policy'
        },
        recommendations: [
          'Simplify the signup process',
          'Add more customer testimonials',
          'Improve mobile responsiveness',
          'Enhance visual hierarchy'
        ]
      }
    }
  };
  return { reviews };
}