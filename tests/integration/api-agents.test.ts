import { ApiService } from '@/services/api';
import { RequestValueStrategyInput, RequestGrowthStrategyInput, RequestTechStrategyInput } from '@/schemas/agent';
import { GetDeliverableResponseBody, GetOrdersResponseBody, OrderResponseBody } from '@/schemas/http-responses';

describe('Agent API Integration Tests', () => {
  let apiService: ApiService;
  // This token should be set in the environment or passed in some other secure way
  const TOKEN = process.env.TEST_AUTH_TOKEN || '';
  
  beforeAll(() => {
    if (!TOKEN) {
      throw new Error('TEST_AUTH_TOKEN environment variable must be set');
    }
    apiService = new ApiService();
  });

  describe('Orders and Deliverables', () => {
    test('should get user orders', async () => {
      const response = await apiService.getOrders(TOKEN);
      
      expect(response).toHaveProperty('data');
      expect(Array.isArray(response.data)).toBe(true);
      
      if (response.data.length > 0) {
        expect(response.data[0]).toHaveProperty('orderId');
        expect(response.data[0]).toHaveProperty('orderStatus');
        expect(response.data[0]).toHaveProperty('orderCreatedAt');
      }
    });

    test('should get deliverable by order ID', async () => {
      const ordersResponse = await apiService.getOrders(TOKEN);
      
      if (!ordersResponse.data.length) {
        throw new Error('No orders found to test with');
      }
      
      expect(ordersResponse.data[0]).toHaveProperty('orderId');
      
      const deliverableResponse = await apiService.getDeliverable(TOKEN, ordersResponse.data[0].orderId);
      
      expect(deliverableResponse).toHaveProperty('data');
      expect(deliverableResponse.data).toHaveProperty('deliverableId');
      expect(deliverableResponse.data).toHaveProperty('deliverableContent');
    });
  });

  describe('Strategy Services', () => {
    test('should request value strategy', async () => {
      const request: RequestValueStrategyInput = {
        deliverableName: 'Deliverable 1',
        applicationIdea: 'A new SaaS platform for integration testing',
        idealCustomer: 'Software development teams',
        problem: 'Manual testing is time-consuming and error-prone',
        solution: 'Automate testing with AI'
      };
      
      const response = await apiService.requestValueStrategy(TOKEN, request);
      
      expect(response).toHaveProperty('orderId');
      expect(response).toHaveProperty('orderStatus');
      expect(response).toHaveProperty('orderCreatedAt');
      expect(response.orderStatus).toBe('pending');
    });

    test('should request growth strategy', async () => {
      const request: RequestGrowthStrategyInput = {
        deliverableName: 'Deliverable 1',
        applicationIdea: 'A new SaaS platform for integration testing',
        idealCustomer: 'Software development teams',
        targetAnnualRevenue: 1000000
      };
      
      const response = await apiService.requestGrowthStrategy(TOKEN, request);
      
      expect(response).toHaveProperty('orderId');
      expect(response).toHaveProperty('orderStatus');
      expect(response).toHaveProperty('orderCreatedAt');
      expect(response.orderStatus).toBe('pending');
    });

    test('should request tech strategy', async () => {
      const request: RequestTechStrategyInput = {
        deliverableName: 'Deliverable 1',
        useCases: 'User authentication, data storage, real-time updates',
        nonFunctional: 'High availability, scalability, security'
      };
      
      const response = await apiService.requestTechStrategy(TOKEN, request);
      
      expect(response).toHaveProperty('orderId');
      expect(response).toHaveProperty('orderStatus');
      expect(response).toHaveProperty('orderCreatedAt');
      expect(response.orderStatus).toBe('pending');
    });
  });
});
