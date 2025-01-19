import { BillingService } from '@/services/billingService';
import { CreditBalance } from '@/schemas/billing';
import { apiService } from '@/services/api';

/** @jest-environment jsdom */

jest.mock('@/services/api');

describe('Billing Service Tests', () => {
  let billingService: BillingService;
  const mockToken = 'test-token';

  beforeEach(() => {
    billingService = new BillingService();
    jest.clearAllMocks();
  });

  describe('getUserCreditsRemaining', () => {
    test('should return credit balance', async () => {
      const result = await billingService.getUserCreditsRemaining(mockToken);
      
      expect(result).toEqual({ credits: 100 });
    });
  });

  describe('getCheckoutSessionId', () => {
    test('should call apiService and return session id', async () => {
      const mockSessionId = 'test-session-id';
      (apiService.getCheckoutSessionId as jest.Mock).mockResolvedValueOnce(mockSessionId);

      const result = await billingService.getCheckoutSessionId(mockToken);

      expect(apiService.getCheckoutSessionId).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(mockSessionId);
    });

    test('should propagate errors from apiService', async () => {
      const mockError = new Error('API Error');
      (apiService.getCheckoutSessionId as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(billingService.getCheckoutSessionId(mockToken))
        .rejects
        .toThrow(mockError);
    });
  });
});
