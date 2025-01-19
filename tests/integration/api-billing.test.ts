import { ApiService } from '@/services/api';
import { BillingService } from '@/services/billingService';
import { CreditBalance } from '@/schemas/billing';

describe('Billing API Integration Tests', () => {
  let apiService: ApiService;
  let billingService: BillingService;
  // This token should be set in the environment or passed in some other secure way
  const TOKEN = process.env.TEST_AUTH_TOKEN || '';
  
  beforeAll(() => {
    if (!TOKEN) {
      throw new Error('TEST_AUTH_TOKEN environment variable must be set');
    }
    apiService = new ApiService();
    billingService = new BillingService();
  });

  describe('Credit Management', () => {
    test('should get user credits remaining', async () => {
      const response = await billingService.getUserCreditsRemaining(TOKEN);
      console.log(response);
      expect(typeof response).toBe('number');
      expect(response).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Checkout Session', () => {
    test('should get checkout session ID', async () => {
      const sessionId = await billingService.getCheckoutSessionId(TOKEN);
      expect(typeof sessionId).toBe('string');
      expect(sessionId.length).toBeGreaterThan(0);
    });
  });
});
