'use client';

import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { getCheckoutSessionId } from '@/lib/api';
import { mockApiResponses } from '@/lib/mockData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const USE_MOCK_DATA = true; // Toggle this to switch between mock and real data

export function useUserCreditsRemaining() {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['userCreditsRemaining'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockApiResponses.userCreditsRemaining;
      }

      const token = await getToken();
      const response = await fetch(`${API_URL}/credits/remaining`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
}

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
        const sessionId = await getCheckoutSessionId(token);
  
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
  

