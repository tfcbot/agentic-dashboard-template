import type { CreditBalance } from '@/schemas/billing';
import { apiService } from '@/services/api';

interface IBillingService {
  getUserCreditsRemaining(token: string): Promise<CreditBalance>;
  purchaseCredits(token: string, quantity: number): Promise<CreditBalance>;

}

export class BillingService implements IBillingService {
  async getUserCreditsRemaining(token: string): Promise<CreditBalance> {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Mock implementation - replace with real API call
      const mockCredits = 100;
      return { credits: mockCredits };
    } catch (error) {
      return { credits: 0 };
    }
  }

  async purchaseCredits(token: string, quantity: number): Promise<CreditBalance> {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Mock implementation - replace with real API call
      const mockNewTotal = quantity + 100;
      return { credits: mockNewTotal };
    } catch (error) {
      return { credits: 0 };
    }
  }

  async getCheckoutSessionId(token: string): Promise<string> {
    console.log('Getting Checkout Session Id');
    const response = await apiService.getCheckoutSessionId(token);
    return response;
  }
};

export const billingService = new BillingService();