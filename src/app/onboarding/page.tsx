import React from 'react';
import OnboardingWorkflow from "@/components/OnboardingWorkflow";
import { OnboardingProvider } from '@/context/OnboardingContext';

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <div className="p-6 bg-gray-900 min-h-screen">
        <OnboardingWorkflow />
      </div>
    </OnboardingProvider>
  );
} 