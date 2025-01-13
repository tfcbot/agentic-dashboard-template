import { AgentConfig, GetWebsiteReviewsResponseBody, OrderFormData, RequestWebsiteReviewBody } from '@/schemas';
import { AgentService } from '@/services/agentService';




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

const websiteReviewDeliverable = {
  sections: [
    {
      id: 'headline-effectiveness',
      label: 'Headline Effectiveness',
      type: 'metrics',
      description: 'Analysis of your headline performance and impact'
    },
    {
      id: 'value-proposition',
      label: 'Value Proposition',
      type: 'list',
      description: 'Assessment of your unique selling points and value communication'
    },
    {
      id: 'content-engagement',
      label: 'Content Engagement',
      type: 'metrics',
      description: 'Analysis of content readability and engagement factors'
    },
    {
      id: 'conversion-analysis',
      label: 'Conversion Analysis',
      type: 'table',
      description: 'Detailed analysis of conversion optimization opportunities'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'recommendations',
      description: 'Actionable steps to improve your website'
    }
  ],
  availableFormats: ['pdf', 'markdown']
};

const codeReviewDeliverable = {
  sections: [
    {
      id: 'architecture',
      label: 'Architecture Assessment',
      type: 'text',
      description: 'Evaluation of your codebase architecture and structure'
    },
    {
      id: 'code-quality',
      label: 'Code Quality Metrics',
      type: 'metrics',
      description: 'Key metrics about code quality and test coverage'
    },
    {
      id: 'performance',
      label: 'Performance Analysis',
      type: 'table',
      description: 'Detailed performance metrics and bottlenecks'
    },
    {
      id: 'security',
      label: 'Security Review',
      type: 'list',
      description: 'Security findings and potential vulnerabilities'
    },
    {
      id: 'recommendations',
      label: 'Technical Recommendations',
      type: 'recommendations',
      description: 'Prioritized technical improvements'
    }
  ],
  availableFormats: ['pdf', 'markdown']
};

const marketResearchDeliverable = {
  sections: [
    {
      id: 'market-overview',
      label: 'Market Overview',
      type: 'text',
      description: 'Comprehensive overview of the market landscape'
    },
    {
      id: 'market-size',
      label: 'Market Size & Growth',
      type: 'metrics',
      description: 'Key market statistics and growth projections'
    },
    {
      id: 'competitor-analysis',
      label: 'Competitor Analysis',
      type: 'table',
      description: 'Detailed comparison of key competitors'
    },
    {
      id: 'opportunities',
      label: 'Market Opportunities',
      type: 'list',
      description: 'Identified market opportunities and gaps'
    },
    {
      id: 'recommendations',
      label: 'Strategic Recommendations',
      type: 'recommendations',
      description: 'Strategic actions to capture market opportunities'
    }
  ],
  availableFormats: ['pdf', 'markdown', 'presentation']
};

export const getMockOrders = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    orders: [
      {
        id: 'order-1',
        agentId: '9d3f7a1e-5b2c-4e8d-a6f9-2c4b8d3e1a5f',
        agentName: 'Value Strategist',
        status: 'completed',
        createdAt: '2024-03-15T10:30:00Z',
        completedAt: '2024-03-15T11:30:00Z',
        credits: 10,
        deliverable: {
          agentId: '9d3f7a1e-5b2c-4e8d-a6f9-2c4b8d3e1a5f',
          title: 'Value Specification Document',
          summary: 'Strategic analysis of your application idea and value propositions',
          createdAt: new Date('2024-03-15T11:30:00Z'),
          content: {
            sections: {
              'ideal-customer': {
                type: 'text',
                data: 'Small to medium-sized businesses looking to optimize their development processes and improve productivity.'
              },
              'problem': {
                type: 'text',
                data: 'Development teams struggle with inefficient workflows and lack of standardization in their coding practices.'
              },
              'value-proposition': {
                type: 'text',
                data: 'An AI-powered development assistant that helps teams write better code faster and maintain consistent quality standards.'
              },
              'profit-proposition': {
                type: 'text',
                data: 'Reduced development time and costs through automated code review and standardization.'
              },
              'people-proposition': {
                type: 'text',
                data: 'Developers can focus on creative problem-solving while the AI handles routine tasks and quality checks.'
              },
              'core-benefit': {
                type: 'text',
                data: 'Increased developer productivity and code quality'
              },
              'core-feature': {
                type: 'text',
                data: 'Real-time AI code analysis and suggestions'
              },
              'solution-overview': {
                type: 'text',
                data: 'An intelligent IDE plugin that provides real-time code analysis, suggestions, and automated refactoring.'
              },
              'benefit-breakdown': {
                type: 'list',
                data: [
                  'Faster development cycles',
                  'Improved code quality',
                  'Reduced technical debt',
                  'Better developer experience',
                  'Consistent coding standards'
                ]
              },
              'first-order': {
                type: 'text',
                data: 'Immediate improvement in code quality and development speed'
              },
              'second-order': {
                type: 'text',
                data: 'Long-term reduction in maintenance costs and technical debt'
              },
              'pricing': {
                type: 'table',
                data: [
                  {
                    'Plan': 'Basic',
                    'Price': '$10/month',
                    'Features': 'Core Analysis',
                    'Target': 'Individual'
                  },
                  {
                    'Plan': 'Pro',
                    'Price': '$29/month',
                    'Features': 'Advanced Features',
                    'Target': 'Small Team'
                  },
                  {
                    'Plan': 'Enterprise',
                    'Price': 'Custom',
                    'Features': 'Full Suite',
                    'Target': 'Large Team'
                  }
                ]
              }
            }
          }
        }
      },
      {
        id: 'order-2',
        agentId: '7b9e4c1d-8f2a-4e8b-b3c5-9d6a2e1f8b4a',
        agentName: 'MVP Strategist',
        status: 'completed',
        createdAt: '2024-03-16T09:15:00Z',
        completedAt: '2024-03-16T10:45:00Z',
        credits: 30,
        deliverable: {
          agentId: '7b9e4c1d-8f2a-4e8b-b3c5-9d6a2e1f8b4a',
          title: 'MVP Technical Strategy',
          summary: 'Technical architecture and implementation strategy for your MVP',
          createdAt: new Date('2024-03-16T10:45:00Z'),
          content: {
            sections: {
              'use-cases': {
                type: 'list',
                data: [
                  'User authentication and profile management',
                  'Real-time code analysis',
                  'Automated refactoring suggestions',
                  'Team collaboration features',
                  'Integration with popular IDEs'
                ]
              },
              'non-functional': {
                type: 'list',
                data: [
                  'Response time under 100ms for analysis',
                  'High availability (99.9% uptime)',
                  'End-to-end encryption',
                  'GDPR compliance',
                  'Scalable to 10,000 concurrent users'
                ]
              },
              'domain-model': {
                type: 'text',
                data: 'Core entities include User, Project, CodeAnalysis, and Suggestion. Users can have multiple projects, each containing multiple code analyses and receiving suggestions.'
              },
              'data-model': {
                type: 'table',
                data: [
                  {
                    'Entity': 'User',
                    'Fields': 'id, email, settings',
                    'Relations': 'Projects, Teams'
                  },
                  {
                    'Entity': 'Project',
                    'Fields': 'id, name, config',
                    'Relations': 'User, CodeAnalyses'
                  },
                  {
                    'Entity': 'CodeAnalysis',
                    'Fields': 'id, content, results',
                    'Relations': 'Project, Suggestions'
                  }
                ]
              },
              'api-design': {
                type: 'text',
                data: 'RESTful API with GraphQL for complex queries. WebSocket connections for real-time analysis updates.'
              },
              'services-design': {
                type: 'text',
                data: 'Microservices architecture with separate services for authentication, analysis, and real-time updates.'
              },
              'deployment': {
                type: 'text',
                data: 'Containerized deployment on Kubernetes with automatic scaling and blue-green deployments.'
              }
            }
          }
        }
      },
      {
        id: 'order-3',
        agentId: 'pricing-strategist',
        agentName: 'Pricing Strategist',
        status: 'completed',
        createdAt: '2024-03-16T14:45:00Z',
        completedAt: '2024-03-16T16:30:00Z',
        credits: 20,
        deliverable: {
          agentId: 'pricing-strategist',
          title: 'Pricing and Revenue Strategy',
          summary: 'Comprehensive pricing strategy and revenue optimization plan',
          createdAt: new Date('2024-03-16T16:30:00Z'),
          content: {
            sections: {
              'distribution-channels': {
                type: 'list',
                data: [
                  'Direct website sales',
                  'IDE marketplace integrations',
                  'Developer community partnerships',
                  'Tech conference sponsorships',
                  'Developer influencer collaborations'
                ]
              },
              'customer-journey': {
                type: 'text',
                data: 'Start with a free trial focused on individual developers, then expand to team usage through viral adoption, ultimately targeting enterprise sales.'
              },
              'first-10-customers': {
                type: 'text',
                data: 'Focus on tech startups and small development teams. Offer extended trials and personalized onboarding support.'
              },
              'first-100-customers': {
                type: 'text',
                data: 'Leverage early adopter success stories for case studies. Implement referral program and focus on community building.'
              },
              'growth-routines': {
                type: 'table',
                data: [
                  {
                    'Metric': 'User Activation',
                    'Target': '60%',
                    'Frequency': 'Daily',
                    'Owner': 'Product'
                  },
                  {
                    'Metric': 'Team Conversion',
                    'Target': '30%',
                    'Frequency': 'Weekly',
                    'Owner': 'Sales'
                  },
                  {
                    'Metric': 'Revenue Growth',
                    'Target': '15%',
                    'Frequency': 'Monthly',
                    'Owner': 'Finance'
                  }
                ]
              }
            }
          }
        }
      }
    ]
  };
};

export const getMockDeliverable = async (orderId: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const orders = await getMockOrders();
  const order = orders.orders.find(o => o.id === orderId);
  
  if (!order || !order.deliverable) {
    throw new Error('Deliverable not found');
  }
  
  return order.deliverable;
};