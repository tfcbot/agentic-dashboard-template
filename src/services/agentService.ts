import { Agent, AgentResponse, OrderFormData, IntakeSubmissionResponse } from '@/types';

/**
 * Service class for handling agent-related API operations
 */
export class AgentService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
  private static RETRY_ATTEMPTS = 3;
  private static RETRY_DELAY = 1000;

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

      if (!formData.schedule) {
        return {
          success: false,
          error: 'Schedule is required'
        };
      }

      if (!formData.access.length) {
        return {
          success: false,
          error: 'Access level is required'
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
    return {
      id,
      name: "AI Assistant Pro",
      title: "Professional AI Assistant",
      description: "Professional AI assistant for all your needs. Specialized in task automation, data analysis, and content creation.",
      imageUrl: "https://example.com/image.jpg",
      startingPrice: 100,
      available: true,
      keyDeliverables: [
        "Task Automation",
        "Data Analysis",
        "Content Creation"
      ],
      rating: 4,
      longDescription: "Tollere odium autem in nostra potestate sint, ab omnibus et contra naturam transferre in nobis. Sed interim toto desiderio supprimunt: si vis aliqua quae in manu tua tibi necesse confundentur et quae, quod laudabile esset, nihil tamen possides.",
      additionalInfo: "Oportet uti solum de actibus prosequtionem et fugam, haec leniter et blandus et reservato.",
      faq: [
        {
          question: "What services are included?",
          answer: "Tollere odium autem in nostra potestate sint, ab omnibus et contra naturam transferre in nobis. Sed interim toto desiderio supprimunt."
        },
        {
          question: "How long does delivery take?",
          answer: "Oportet uti solum de actibus prosequtionem et fugam, haec leniter et blandus et reservato."
        }
      ],
      packages: {
        basic: {
          name: "Basic",
          price: 100,
          deliveryTime: "15 Mins Delivery",
          features: [
            "Tenete ergo quod si",
            "Basic task automation",
            "Standard support"
          ]
        },
        standard: {
          name: "Standard",
          price: 200,
          deliveryTime: "10 Mins Delivery",
          features: [
            "Everything in Basic",
            "Advanced automation",
            "Priority support"
          ]
        },
        priority: {
          name: "Priority",
          price: 500,
          deliveryTime: "5 Mins Delivery",
          features: [
            "Everything in Standard",
            "Custom solutions",
            "24/7 dedicated support"
          ]
        }
      }
    };
  }
} 