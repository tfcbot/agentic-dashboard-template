'use client';

import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { billingService } from '@/services/billingService';

const API_URL = process.env.NEXT_API_URL || 'http://localhost:3000/api';
const USE_MOCK_DATA = true; // Toggle this to switch between mock and real data


export function useUserCreditsRemaining() {
    const { getToken } = useAuth();
  
    return useQuery({
      queryKey: ['userCreditsRemaining'],
      queryFn: async () => {
            const token = await getToken();
            if (!token) throw new Error('No token available');
            const credits = await billingService.getUserCreditsRemaining(token);
        return credits;
      },
    });
  }

  export function usePurchaseCredits() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
  
    const getSessionId = async (token: string): Promise<string> => {
      setIsLoading(true);
      setError(null);
      try {
        const sessionId = await billingService.getCheckoutSessionId(token);
  
        if (!sessionId) {
          throw new Error('Failed to create checkout session');
        }
  
        return sessionId;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { getSessionId, isLoading, error };
  }
  
