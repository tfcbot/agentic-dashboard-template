import { ApiService } from '@/services/api';
import { GetDeliverableResponseBody, GetOrdersResponseBody, OrderResponseBody } from '@/schemas/http-responses';
import { RequestValueStrategyInput, RequestGrowthStrategyInput, RequestTechStrategyInput } from '@/schemas/agent';
/** @jest-environment jsdom */

describe('API Service Tests', () => {
  let apiService: ApiService;
  const mockToken = 'test-token';
  const BASE_URL = process.env.NEXT_API_URL;

  beforeAll(() => {
    apiService = new ApiService();
  });

  describe('URL and Headers', () => {
    test('getAbsoluteUrl should return correct URL', () => {
      const path = '/test';
      const url = apiService.getAbsoluteUrl(path);
      expect(url).toBe(`${BASE_URL}/test`);
    });

    test('getHeaders should include authorization token', () => {
      const headers = apiService.getHeaders(mockToken);
      expect(headers).toEqual({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mockToken}`
      });
    });
  });

  describe('API Endpoints', () => {
    beforeAll(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      (global.fetch as jest.Mock).mockClear();
    });

    test('getOrders should make correct API call', async () => {
      const mockOrders: GetOrdersResponseBody = { 
        data: [{
          orderId: 'order-1',
          orderStatus: 'completed',
          orderCreatedAt: new Date().toISOString(),
          deliverableName: 'Deliverable 1',
          success: true
        }]
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockOrders)
      });

      const result = await apiService.getOrders(mockToken);
      
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/orders`,
        {
          method: 'GET',
          headers: apiService.getHeaders(mockToken)
        }
      );
      expect(result).toEqual(mockOrders);
    });

    test('getDeliverable should make correct API call', async () => {
      const orderId = 'test-order-id';
      const mockDeliverable: GetDeliverableResponseBody = { 
        data: { 
          deliverableId: 'deliverable-1',
          agentId: 'agent-1',
          deliverableName: 'Deliverable 1',
          deliverableContent: {
            sections: {
              section1: {
                type: 'text',
                id: 'section-1',
                label: 'Section 1',
                order: 1,
                data: 'Test deliverable content'
              }
            }
          }
        } 
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockDeliverable)
      });

      const result = await apiService.getDeliverable(mockToken, orderId);
      
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/orders/deliverables/${orderId}`,
        {
          method: 'GET',
          headers: apiService.getHeaders(mockToken)
        }
      );
      expect(result).toEqual(mockDeliverable);
    });

    test('requestValueStrategist should make correct API call', async () => {
      const mockBody: RequestValueStrategyInput = {
        deliverableName: 'Deliverable 1',
        agentId: 'agent-1',
        applicationIdea: 'test application idea',
        idealCustomer: 'test customer',
        problem: 'test problem',
        solution: 'test solution'
      };
      const mockResponse: OrderResponseBody = {   
        orderId: 'order-1',
        orderStatus: 'pending',
        orderCreatedAt: new Date().toISOString(),
        deliverableName: 'Deliverable 1',
        success: true
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await apiService.requestValueStrategy(mockToken, mockBody);
      
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/value-strategy`,
        {
          method: 'POST',
          headers: apiService.getHeaders(mockToken),
          body: JSON.stringify(mockBody)
        }
      );
      expect(result).toEqual(mockResponse);
    });

    test('requestGrowthStrategy should make correct API call', async () => {
      const mockBody: RequestGrowthStrategyInput = {
        deliverableName: 'Deliverable 1',
        agentId: 'agent-1',
        applicationIdea: 'test application idea',
        idealCustomer: 'test customer',
        targetAnnualRevenue: 1000000
      };
      const mockResponse: OrderResponseBody = { 
        orderId: 'order-1',
        orderStatus: 'pending',
        orderCreatedAt: new Date().toISOString(),
        deliverableName: 'Deliverable 1',
        success: true
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await apiService.requestGrowthStrategy(mockToken, mockBody);
      
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/growth-strategy`,
        {
          method: 'POST',
          headers: apiService.getHeaders(mockToken),
          body: JSON.stringify(mockBody)
        }
      );
      expect(result).toEqual(mockResponse);
    });

    test('requestTechStrategy should make correct API call', async () => {
      const mockBody: RequestTechStrategyInput = {
        deliverableName: 'Deliverable 1',
        agentId: 'agent-1',
        useCases: 'test use cases',
        nonFunctional: 'test non functional requirements'
      };
      const mockResponse: OrderResponseBody = { 
        orderId: 'order-1',
        orderStatus: 'pending',
        orderCreatedAt: new Date().toISOString(),
        deliverableName: 'Deliverable 1',
        success: true
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await apiService.requestTechStrategy(mockToken, mockBody);
      
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/tech-strategy`,
        {
          method: 'POST',
          headers: apiService.getHeaders(mockToken),
          body: JSON.stringify(mockBody)
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
