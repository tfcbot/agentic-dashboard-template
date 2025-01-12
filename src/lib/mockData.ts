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
        agentId: '6f9619ff-8b86-d011-b42d-00c04fc964ff',
        agentName: 'Website Analysis Agent',
        status: 'completed',
        createdAt: '2024-03-15T10:30:00Z',
        completedAt: '2024-03-15T11:30:00Z',
        credits: 2500,
        deliverable: {
          agentId: '6f9619ff-8b86-d011-b42d-00c04fc964ff',
          title: 'Website Review Analysis',
          summary: 'Comprehensive analysis of your website performance and recommendations',
          createdAt: new Date('2024-03-15T11:30:00Z'),
          content: {
            sections: {
              'headline-effectiveness': {
                type: 'metrics',
                data: {
                  'Clarity Score': '8.5/10',
                  'Benefit Focus': 'Strong',
                  'Urgency Factor': 'Moderate',
                  'Emotional Appeal': '8/10'
                }
              },
              'value-proposition': {
                type: 'list',
                data: [
                  'Clear and compelling unique selling points',
                  'Strong benefit articulation',
                  'Effective pain point addressing',
                  'Professional presentation'
                ]
              },
              'content-engagement': {
                type: 'metrics',
                data: {
                  'Readability Score': '92%',
                  'Avg. Time on Page': '2:45',
                  'Bounce Rate': '35%',
                  'Mobile Engagement': '78%'
                }
              },
              'conversion-analysis': {
                type: 'table',
                data: [
                  {
                    'Element': 'Call to Action',
                    'Current Rate': '2.3%',
                    'Benchmark': '2.8%',
                    'Opportunity': 'Medium'
                  },
                  {
                    'Element': 'Lead Form',
                    'Current Rate': '4.5%',
                    'Benchmark': '3.9%',
                    'Opportunity': 'Low'
                  },
                  {
                    'Element': 'Product Pages',
                    'Current Rate': '1.8%',
                    'Benchmark': '2.5%',
                    'Opportunity': 'High'
                  }
                ]
              },
              'recommendations': {
                type: 'recommendations',
                data: [
                  'Optimize image sizes and implement lazy loading',
                  'Implement browser caching strategy',
                  'Enhance mobile responsiveness with fluid layouts',
                  'Add ARIA labels to interactive elements',
                  'Implement progressive form validation'
                ]
              }
            }
          }
        }
      },
      {
        id: 'order-2',
        agentId: '7f9e4a2b-1d3c-5e8f-9b6a-8c7d2f1e3a4b',
        agentName: 'AI Coding Strategist',
        status: 'completed',
        createdAt: '2024-03-16T09:15:00Z',
        completedAt: '2024-03-16T10:45:00Z',
        credits: 199,
        deliverable: {
          agentId: '7f9e4a2b-1d3c-5e8f-9b6a-8c7d2f1e3a4b',
          title: 'Code Architecture Analysis',
          summary: 'Strategic analysis of your codebase architecture with modernization recommendations',
          createdAt: new Date('2024-03-16T10:45:00Z'),
          content: {
            sections: {
              'architecture': {
                type: 'text',
                data: 'The codebase follows a monolithic architecture with clear separation of concerns. While this serves current needs, there are opportunities for modularization and service-oriented improvements. Key architectural patterns are well-implemented, but some components show tight coupling that could be addressed.'
              },
              'code-quality': {
                type: 'metrics',
                data: {
                  'Test Coverage': '78%',
                  'Code Duplication': '4.2%',
                  'Technical Debt': 'Medium',
                  'Documentation': '85%'
                }
              },
              'performance': {
                type: 'table',
                data: [
                  {
                    'Component': 'Authentication',
                    'Response Time': '250ms',
                    'Issue': 'N+1 Query',
                    'Impact': 'High'
                  },
                  {
                    'Component': 'Data Processing',
                    'Response Time': '1.2s',
                    'Issue': 'Memory Leak',
                    'Impact': 'Medium'
                  },
                  {
                    'Component': 'API Gateway',
                    'Response Time': '150ms',
                    'Issue': 'None',
                    'Impact': 'Low'
                  }
                ]
              },
              'security': {
                type: 'list',
                data: [
                  'Input validation needs strengthening in user-facing APIs',
                  'Session management follows best practices',
                  'API rate limiting should be implemented',
                  'Dependency scanning shows 3 medium vulnerabilities'
                ]
              },
              'recommendations': {
                type: 'recommendations',
                data: [
                  'Implement domain-driven design patterns',
                  'Add Redis caching layer for frequently accessed data',
                  'Refactor authentication flow to use JWT tokens',
                  'Set up automated security scanning',
                  'Implement GraphQL for flexible data fetching'
                ]
              }
            }
          }
        }
      },
      {
        id: 'order-3',
        agentId: '3d813cbb-47fb-4d9d-9b7b-a5a04d8e6c9a',
        agentName: 'Research Assistant',
        status: 'completed',
        createdAt: '2024-03-16T14:45:00Z',
        completedAt: '2024-03-16T16:30:00Z',
        credits: 6000,
        deliverable: {
          agentId: '3d813cbb-47fb-4d9d-9b7b-a5a04d8e6c9a',
          title: 'Market Analysis Report',
          summary: 'In-depth analysis of the SaaS market landscape and competitive positioning',
          createdAt: new Date('2024-03-16T16:30:00Z'),
          content: {
            sections: {
              'market-overview': {
                type: 'text',
                data: 'The SaaS market continues to show robust growth, driven by digital transformation initiatives and increasing demand for cloud-based solutions. The developer tools segment, in particular, demonstrates strong potential with emerging opportunities in AI-powered solutions.'
              },
              'market-size': {
                type: 'metrics',
                data: {
                  'Total Market Size': '$9.5B',
                  'CAGR': '23%',
                  'Market Share': '12%',
                  'Growth Potential': 'High'
                }
              },
              'competitor-analysis': {
                type: 'table',
                data: [
                  {
                    'Competitor': 'TechCo',
                    'Market Share': '15%',
                    'Strengths': 'Brand Recognition',
                    'Weaknesses': 'High Pricing'
                  },
                  {
                    'Competitor': 'DevTools Inc',
                    'Market Share': '8%',
                    'Strengths': 'Feature Rich',
                    'Weaknesses': 'Poor UX'
                  },
                  {
                    'Competitor': 'AICode',
                    'Market Share': '5%',
                    'Strengths': 'AI Innovation',
                    'Weaknesses': 'Limited Integration'
                  }
                ]
              },
              'opportunities': {
                type: 'list',
                data: [
                  'Growing demand for specialized AI development tools',
                  'Underserved enterprise segment',
                  'Integration opportunities with major CI/CD platforms',
                  'Emerging markets in APAC region'
                ]
              },
              'recommendations': {
                type: 'recommendations',
                data: [
                  'Focus marketing on developer productivity gains',
                  'Develop enterprise-specific features',
                  'Create integration partnerships with major CI/CD platforms',
                  'Introduce tiered pricing for different company sizes',
                  'Invest in AI-powered security scanning features'
                ]
              }
            }
          }
        }
      },
      {
        id: 'order-4',
        agentId: '7f9e4a2b-1d3c-5e8f-9b6a-8c7d2f1e3a4b',
        agentName: 'AI Coding Strategist',
        status: 'in_progress',
        createdAt: '2024-03-17T09:00:00Z',
        credits: 199,
        deliverable: null
      },
      {
        id: 'order-5',
        agentId: '6f9619ff-8b86-d011-b42d-00c04fc964ff',
        agentName: 'Website Analysis Agent',
        status: 'pending',
        createdAt: '2024-03-17T11:45:00Z',
        credits: 2500,
        deliverable: null
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