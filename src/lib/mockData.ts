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

export const getMockOrders = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    orders: [
      {
        id: 'order-1',
        agentId: 'website-review-agent',
        agentName: 'Website Review Agent',
        packageType: 'basic',
        status: 'completed',
        createdAt: '2024-03-15T10:30:00Z',
        completedAt: '2024-03-15T11:30:00Z',
        credits: 100,
        deliverable: {
          type: 'website_review',
          title: 'Website Review Analysis',
          summary: 'Comprehensive analysis of your website performance and recommendations',
          formats: ['pdf', 'markdown'],
          content: {
            overview: 'Your website demonstrates strong fundamentals but has room for improvement in key areas of user experience and performance optimization.',
            sections: [
              {
                title: 'User Experience Analysis',
                content: 'The website navigation is intuitive but could benefit from better mobile optimization. Key user flows are well-designed but form completion rates could be improved with better validation feedback.'
              },
              {
                title: 'Performance Metrics',
                content: 'Current load time averages 3.2 seconds, which is above industry standard. Core Web Vitals show room for improvement, particularly in Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).'
              },
              {
                title: 'SEO & Accessibility',
                content: 'Meta descriptions and title tags are well-optimized. However, some images lack alt text and heading hierarchy could be improved for better screen reader compatibility.'
              }
            ],
            recommendations: [
              'Optimize image sizes and implement lazy loading',
              'Implement browser caching strategy',
              'Enhance mobile responsiveness with fluid layouts',
              'Add ARIA labels to interactive elements',
              'Implement progressive form validation'
            ]
          }
        }
      },
      {
        id: 'order-2',
        agentId: 'ai-coding-strategist',
        agentName: 'AI Coding Strategist',
        packageType: 'standard',
        status: 'completed',
        createdAt: '2024-03-16T09:15:00Z',
        completedAt: '2024-03-16T10:45:00Z',
        credits: 200,
        deliverable: {
          type: 'code_review',
          title: 'Code Architecture Analysis',
          summary: 'Strategic analysis of your codebase architecture with modernization recommendations',
          formats: ['pdf', 'markdown'],
          content: {
            overview: 'Your codebase shows good organization but could benefit from modern architectural patterns and performance optimizations.',
            sections: [
              {
                title: 'Architecture Assessment',
                content: 'Current monolithic architecture serves basic needs but shows signs of scalability challenges. Microservices could be gradually introduced for key components.'
              },
              {
                title: 'Code Quality Analysis',
                content: 'Overall code quality is good with 78% test coverage. Some modules show high cyclomatic complexity and could benefit from refactoring.'
              },
              {
                title: 'Performance Bottlenecks',
                content: 'Database queries in the user authentication flow show N+1 problems. API response times could be improved with better caching strategies.'
              },
              {
                title: 'Security Review',
                content: 'Basic security practices are in place. Recommend implementing rate limiting and strengthening input validation.'
              }
            ],
            recommendations: [
              'Implement domain-driven design patterns',
              'Add Redis caching layer for frequently accessed data',
              'Refactor authentication flow to use JWT tokens',
              'Set up automated security scanning',
              'Implement GraphQL for flexible data fetching'
            ]
          }
        }
      },
      {
        id: 'order-3',
        agentId: 'research-assistant',
        agentName: 'Research Assistant',
        packageType: 'priority',
        status: 'completed',
        createdAt: '2024-03-16T14:45:00Z',
        completedAt: '2024-03-16T16:30:00Z',
        credits: 300,
        deliverable: {
          type: 'market_research',
          title: 'Market Analysis Report',
          summary: 'In-depth analysis of the SaaS market landscape and competitive positioning',
          formats: ['pdf', 'markdown', 'presentation'],
          content: {
            overview: 'The SaaS market shows strong growth potential with increasing demand for AI-powered solutions. Your product has unique advantages in developer tooling.',
            sections: [
              {
                title: 'Market Size & Growth',
                content: 'The global developer tools market is expected to reach $9.5B by 2025, with a CAGR of 23%. AI-powered tools represent the fastest-growing segment.'
              },
              {
                title: 'Competitor Analysis',
                content: 'Direct competitors focus on general-purpose AI tools. Opportunity exists for specialized developer productivity solutions with better integration capabilities.'
              },
              {
                title: 'User Demographics',
                content: 'Primary users are full-stack developers in mid-size companies. Growing interest from enterprise customers seeking automation solutions.'
              },
              {
                title: 'Market Trends',
                content: 'Increasing demand for AI-powered code review, automated testing, and intelligent documentation tools. Security and compliance features are becoming key differentiators.'
              }
            ],
            recommendations: [
              'Focus marketing on developer productivity gains',
              'Develop enterprise-specific features',
              'Create integration partnerships with major CI/CD platforms',
              'Introduce tiered pricing for different company sizes',
              'Invest in AI-powered security scanning features'
            ]
          }
        }
      },
      {
        id: 'order-4',
        agentId: 'voice-repurpose-agent',
        agentName: 'Voice Repurpose Agent',
        packageType: 'standard',
        status: 'in_progress',
        createdAt: '2024-03-17T09:00:00Z',
        credits: 150,
        deliverable: null
      },
      {
        id: 'order-5',
        agentId: 'website-review-agent',
        agentName: 'Website Review Agent',
        packageType: 'priority',
        status: 'pending',
        createdAt: '2024-03-17T11:45:00Z',
        credits: 300,
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