import { Agent, AgentResponse, OrderFormData, IntakeSubmissionResponse, AgentMetadata, AgentMetadataResponse } from '@/types';

/**
 * Service class for handling agent-related API operations
 */
export class AgentService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
  private static RETRY_ATTEMPTS = 3;
  private static RETRY_DELAY = 1000;

  /**
   * Fetches metadata for a single agent
   */
  static async getAgentMetadata(id: string): Promise<AgentMetadataResponse> {
    try {
      // TODO: Replace with actual API call
      // Simulated API call for now
      await this.simulateNetworkDelay();
      
      // Use the same mock data as before for consistency
      const mockAgent = this.getMockAgent(id);
      
      return {
        success: true,
        data: {
          id,
          name: mockAgent.name,
          title: mockAgent.title,
          shortDescription: mockAgent.description,
          imageUrl: mockAgent.imageUrl,
          startingPrice: mockAgent.startingPrice,
          rating: mockAgent.rating || 4.8,
          availability: {
            status: mockAgent.available ? 'available' : 'busy',
            nextAvailableSlot: mockAgent.available ? undefined : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          },
          metrics: {
            completedTasks: 1234,
            averageResponseTime: '< 5 mins',
            satisfactionRate: 98,
          },
          packages: mockAgent.packages || {
            basic: {
              name: "Basic",
              price: mockAgent.startingPrice,
              deliveryTime: "15 Mins Delivery",
              features: mockAgent.keyDeliverables.slice(0, 3)
            },
            standard: {
              name: "Standard",
              price: mockAgent.startingPrice * 2,
              deliveryTime: "10 Mins Delivery",
              features: [
                ...mockAgent.keyDeliverables,
                "Priority support"
              ]
            },
            priority: {
              name: "Priority",
              price: mockAgent.startingPrice * 5,
              deliveryTime: "5 Mins Delivery",
              features: [
                ...mockAgent.keyDeliverables,
                "24/7 dedicated support",
                "Custom solutions"
              ]
            }
          }
        }
      };
    } catch (error) {
      console.error('Error fetching agent metadata:', error);
      return {
        success: false,
        error: 'Failed to fetch agent metadata'
      };
    }
  }

  /**
   * Fetches a single agent by ID
   */
  static async getAgent(id: string): Promise<AgentResponse> {
    try {
      // TODO: Replace with actual API call
      // Simulated API call for now
      const mockAgent = this.getMockAgent(id);
      await this.simulateNetworkDelay();
      
      return {
        success: true,
        data: mockAgent
      };
    } catch (error) {
      console.error('Error fetching agent:', error);
      return {
        success: false,
        error: 'Failed to fetch agent details'
      };
    }
  }

  /**
   * Submits an intake form
   */
  static async submitIntake(formData: OrderFormData): Promise<IntakeSubmissionResponse> {
    try {
      // TODO: Replace with actual API call
      // Simulated API call for now
      await this.simulateNetworkDelay();

      // Simulate validation
      if (!formData.description || formData.description.length < 10) {
        return {
          success: false,
          error: 'Description is too short'
        };
      }

      if (!formData.startDate) {
        return {
          success: false,
          error: 'Start date is required'
        };
      }

      if (!formData.frequency) {
        return {
          success: false,
          error: 'Frequency is required'
        };
      }
      
      // Generate a mock order ID
      const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        orderId
      };
    } catch (error) {
      console.error('Error submitting intake form:', error);
      return {
        success: false,
        error: 'Failed to submit order'
      };
    }
  }

  /**
   * Helper method to simulate network delay
   */
  private static async simulateNetworkDelay(ms: number = 1000): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Helper method to get mock agent data
   */
  private static getMockAgent(id: string): Agent {
    // Map URL-friendly IDs to mock agent IDs
    const idMap: { [key: string]: string } = {
      'strategic-planning-consultant': 'agent-1',
      'creative-copywriter': 'agent-2',
      'data-analytics-specialist': 'agent-3'
    };

    const actualId = idMap[id] || id;

    const mockAgents = {
      'agent-1': {
        id: "strategic-planning-consultant",
        name: "Sarah Mitchell",
        title: "Strategic Planning Consultant",
        description: "Expert strategist specializing in business growth and market expansion. Proven track record in developing comprehensive strategic plans, market analysis, and competitive positioning.",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        startingPrice: 750,
        available: true,
        rating: 4.9,
        keyDeliverables: [
          "Comprehensive Market Analysis Report",
          "Strategic Growth Roadmap (12-month plan)",
          "Competitive Analysis Dashboard",
          "Monthly Strategy Review Sessions"
        ],
        faq: [
          {
            question: "What's included in the market analysis?",
            answer: "Our comprehensive market analysis includes competitor research, market sizing, trend analysis, and opportunity identification. We use both qualitative and quantitative methods to provide actionable insights."
          },
          {
            question: "How long does the strategic planning process take?",
            answer: "The initial strategic planning process typically takes 2-3 weeks, followed by monthly review sessions to track progress and make adjustments as needed."
          }
        ],
        longDescription: "With over a decade of experience in strategic planning and business development, I help companies identify and capitalize on growth opportunities. My approach combines data-driven analysis with practical implementation strategies.",
        additionalInfo: "Available for both short-term consultations and long-term strategic partnerships. All engagements include detailed documentation and implementation guidelines.",
        packages: {
          basic: {
            name: "Basic",
            price: 750,
            deliveryTime: "2 Weeks Delivery",
            features: [
              "Market Analysis Report",
              "Basic Growth Strategy",
              "1 Review Session"
            ]
          },
          standard: {
            name: "Standard",
            price: 1500,
            deliveryTime: "10 Days Delivery",
            features: [
              "Everything in Basic",
              "Competitive Analysis",
              "Implementation Roadmap",
              "2 Review Sessions"
            ]
          },
          priority: {
            name: "Priority",
            price: 3000,
            deliveryTime: "5 Days Delivery",
            features: [
              "Everything in Standard",
              "Priority Support",
              "Weekly Review Sessions",
              "Custom KPI Dashboard"
            ]
          }
        }
      },
      'agent-2': {
        id: "creative-copywriter",
        name: "Michael Turner",
        title: "Creative Copywriter & Content Strategist",
        description: "Versatile copywriter with expertise in brand storytelling and content strategy. Specializing in compelling marketing copy, website content, and brand messaging that drives engagement.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        startingPrice: 500,
        available: true,
        rating: 4.8,
        keyDeliverables: [
          "SEO-Optimized Website Copy",
          "Content Calendar (3-month plan)",
          "Email Marketing Sequence",
          "Brand Voice Guidelines"
        ],
        faq: [
          {
            question: "How do you ensure content is SEO-friendly?",
            answer: "I combine keyword research, search intent analysis, and natural language optimization to create content that ranks well while maintaining readability and engagement."
          },
          {
            question: "What's your process for developing brand voice?",
            answer: "I start with a brand audit, followed by stakeholder interviews and market analysis. This helps create comprehensive voice guidelines that ensure consistency across all channels."
          }
        ],
        longDescription: "I help brands find their unique voice and create content that resonates with their target audience. My background in digital marketing and SEO ensures that every piece of content serves both users and search engines.",
        additionalInfo: "All packages include keyword research and competitor analysis to ensure your content stands out in your market.",
        packages: {
          basic: {
            name: "Basic",
            price: 500,
            deliveryTime: "5 Days Delivery",
            features: [
              "5 Pages Website Copy",
              "Basic SEO Optimization",
              "1 Revision Round"
            ]
          },
          standard: {
            name: "Standard",
            price: 1000,
            deliveryTime: "3 Days Delivery",
            features: [
              "Everything in Basic",
              "Content Calendar",
              "Email Sequence",
              "2 Revision Rounds"
            ]
          },
          priority: {
            name: "Priority",
            price: 2000,
            deliveryTime: "24 Hours Delivery",
            features: [
              "Everything in Standard",
              "Brand Voice Guide",
              "Unlimited Revisions",
              "Priority Support"
            ]
          }
        }
      },
      'agent-3': {
        id: "data-analytics-specialist",
        name: "Emily Chen",
        title: "Data Analytics Specialist",
        description: "Data analytics expert with a focus on business intelligence and predictive modeling. Transforming complex data into actionable insights.",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        startingPrice: 650,
        available: false,
        rating: 4.7,
        keyDeliverables: [
          "Custom Analytics Dashboard",
          "Monthly Performance Reports",
          "Predictive Analysis Models",
          "Data-Driven Recommendations"
        ],
        faq: [
          {
            question: "What types of data can you analyze?",
            answer: "I work with various data types including web analytics, customer behavior, sales data, and operational metrics. I can also help set up data collection frameworks if needed."
          },
          {
            question: "How customizable are the dashboards?",
            answer: "Dashboards are fully customizable to your specific KPIs and business needs. They can be integrated with multiple data sources and updated in real-time."
          }
        ],
        longDescription: "Specializing in turning complex data into clear, actionable insights. I help businesses make data-driven decisions through custom analytics solutions, predictive modeling, and automated reporting systems.",
        additionalInfo: "All projects include detailed documentation and training sessions to ensure your team can effectively use and maintain the analytics tools.",
        packages: {
          basic: {
            name: "Basic",
            price: 650,
            deliveryTime: "1 Week Delivery",
            features: [
              "Basic Dashboard Setup",
              "Monthly Reporting",
              "Core Metrics Analysis"
            ]
          },
          standard: {
            name: "Standard",
            price: 1300,
            deliveryTime: "5 Days Delivery",
            features: [
              "Everything in Basic",
              "Custom Metrics",
              "Predictive Modeling",
              "Bi-weekly Reports"
            ]
          },
          priority: {
            name: "Priority",
            price: 2600,
            deliveryTime: "48 Hours Delivery",
            features: [
              "Everything in Standard",
              "Real-time Dashboard",
              "24/7 Support",
              "Weekly Strategy Calls"
            ]
          }
        }
      }
    };

    return mockAgents[actualId] || mockAgents['agent-1'];
  }

  /**
   * Fetches all available agents
   */
  static async getAllAgents(): Promise<AgentResponse> {
    try {
      // TODO: Replace with actual API call
      // GET /agents
      await this.simulateNetworkDelay();
      
      const mockAgents = [
        {
          id: "strategic-planning-consultant",
          name: "Sarah Mitchell",
          title: "Strategic Planning Consultant",
          description: "Expert strategist specializing in business growth and market expansion. Proven track record in developing comprehensive strategic plans, market analysis, and competitive positioning.",
          imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
          startingPrice: 750,
          available: true,
          rating: 4.9,
          keyDeliverables: [
            "Comprehensive Market Analysis Report",
            "Strategic Growth Roadmap (12-month plan)",
            "Competitive Analysis Dashboard",
            "Monthly Strategy Review Sessions"
          ]
        },
        {
          id: "creative-copywriter",
          name: "Michael Turner",
          title: "Creative Copywriter & Content Strategist",
          description: "Versatile copywriter with expertise in brand storytelling and content strategy. Specializing in compelling marketing copy, website content, and brand messaging that drives engagement.",
          imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
          startingPrice: 500,
          available: true,
          rating: 4.8,
          keyDeliverables: [
            "SEO-Optimized Website Copy",
            "Content Calendar (3-month plan)",
            "Email Marketing Sequence",
            "Brand Voice Guidelines"
          ]
        },
        {
          id: "data-analytics-specialist",
          name: "Emily Chen",
          title: "Data Analytics Specialist",
          description: "Data analytics expert with a focus on business intelligence and predictive modeling. Transforming complex data into actionable insights.",
          imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
          startingPrice: 650,
          available: false,
          rating: 4.7,
          keyDeliverables: [
            "Custom Analytics Dashboard",
            "Monthly Performance Reports",
            "Predictive Analysis Models",
            "Data-Driven Recommendations"
          ]
        }
      ];
      
      return {
        success: true,
        data: mockAgents
      };
    } catch (error) {
      console.error('Error fetching agents:', error);
      return {
        success: false,
        error: 'Failed to fetch agents'
      };
    }
  }
} 