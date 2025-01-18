import { ApiService } from '@/services/api';
import { ValueStrategistRequest } from '@/schemas/agent';
import { GetDeliverableResponseBody, GetOrdersResponseBody, OrderResponseBody } from '@/schemas/http-responses';
import { GrowthStrategyRequest, TechStrategyRequest } from '@/schemas/api';

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
          orderCreatedAt: new Date().toISOString()
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
          deliverableContent: 'Test deliverable content'
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
      const mockBody: ValueStrategistRequest = {
        applicationIdea: 'test application idea'
      };
      const mockResponse: OrderResponseBody = { 
        orderId: 'order-1',
        orderStatus: 'pending',
        orderCreatedAt: new Date().toISOString()
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await apiService.requestValueStrategist(mockToken, mockBody);
      
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
      const mockBody: GrowthStrategyRequest = {
        applicationIdea: 'test application idea',
        idealCustomer: 'test customer',
        targetAnnualRevenue: 1000000
      };
      const mockResponse: OrderResponseBody = { 
        orderId: 'order-1',
        orderStatus: 'pending',
        orderCreatedAt: new Date().toISOString()
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
      const mockBody: TechStrategyRequest = {
        useCases: 'test use cases',
        nonFunctional: 'test non functional requirements'
      };
      const mockResponse: OrderResponseBody = { 
        orderId: 'order-1',
        orderStatus: 'pending',
        orderCreatedAt: new Date().toISOString()
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
