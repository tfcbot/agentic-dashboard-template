'use client';

import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { billingService } from '@/services/billingService';
import { apiService } from '@/services/api';
import { OnboardingDTO } from '@/schemas/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';


// Add more API hooks here as needed
export function useUpdateUser() {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (userData: any) => {
      const token = await getToken();
      const response = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
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
  

export function useGetOrders() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error('No token found');
      }
      return apiService.getOrders(token);
    },
  });
}


export function useGetDeliverable(orderId: string) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ['deliverable', orderId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error('No token found');
      }
      return apiService.getDeliverable(token, orderId);
    },
  });
}

export function useUpdateUserOnboardingStatus() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (onboardingData: OnboardingDTO) => {
      const token = await getToken();
      if (!token) throw new Error('No token available');
      return apiService.updateUserOnboardingStatus(token, onboardingData);
    },
  });
}
