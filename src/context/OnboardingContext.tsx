'use client';

import { useUpdateUserOnboardingStatus } from '@/hooks/useApi';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';

interface OnboardingContextType {
  formData: {
    currentRole: string;
    useCase: string;
  };
  updateFormData: (data: Partial<OnboardingContextType['formData']>) => void;
  submitForm: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentRole: '',
    useCase: '',
  });

  const updateFormData = (data: Partial<OnboardingContextType['formData']>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const { mutateAsync: updateUserOnboardingStatusMutation } = useUpdateUserOnboardingStatus();
  
  const submitForm = async () => {
    try {
      await updateUserOnboardingStatusMutation({
        onboardingComplete: true,
        onboardingDetails: {...formData},
      });

      // Initial reload
      await user?.reload();

      // Poll for metadata update
      let retries = 0;
      const maxRetries = 10;
      const pollInterval = 1000; // 1 second

      while (retries < maxRetries) {
        if (user?.publicMetadata.onboardingComplete) {
          router.refresh();
          router.push('/');
          return;
        }

        
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        await user?.reload();
        retries++;
      }

      throw new Error('Onboarding update timeout: Metadata did not update within the expected timeframe');
    } catch (error) {
      console.error('Error during onboarding submission:', error);
      throw error; // Re-throw to be handled by the component
    }
  };

  return (
    <OnboardingContext.Provider value={{ formData, updateFormData, submitForm }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
