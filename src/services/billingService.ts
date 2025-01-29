import { apiService } from '@/services/api';

interface IBillingService {
  getUserCreditsRemaining(token: string): Promise<number>;
  getCheckoutSessionId(token: string): Promise<string>;
}

export class BillingService implements IBillingService {
  async getUserCreditsRemaining(token: string): Promise<number> {
    const response = await apiService.getUserCreditsRemaining(token);
    return response;
  }

  async getCheckoutSessionId(token: string): Promise<string> {
    const response = await apiService.getCheckoutSessionId(token);
    return response;
  }
};

export const billingService = new BillingService();