'use client';

import React, { useState } from 'react';
import OnboardingIndicator from './OnboardingIndicator';
import { useOnboarding } from '@/context/OnboardingContext';
import { DashboardSkeleton } from './DashboardSkeleton';

const STEPS = [
  'Welcome',
  'Account Setup',
  'Use Case',
  'Next'
] as const;

type Step = typeof STEPS[number];

export default function OnboardingWorkflow() {
  const [currentStep, setCurrentStep] = useState<Step>('Welcome');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, updateFormData, submitForm } = useOnboarding();

  const isStepValid = () => {
    switch (currentStep) {
      case 'Welcome':
        return true;
      case 'Account Setup':
        return formData.currentRole && formData.currentRole.length > 0;
      case 'Use Case':
        return formData.useCase && formData.useCase.trim().length > 0;
      case 'Next':
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (!isStepValid()) return;
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const handlePrevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 'Next') {
      setIsSubmitting(true);
      try {
        await submitForm();
      } catch (error) {
        console.error('Error during onboarding:', error);
        setIsSubmitting(false);
      }
    } else {
      handleNextStep();
    }
  };

  if (isSubmitting) {
    return <DashboardSkeleton />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'Welcome':
        return (
          <div className="text-center">
            <h2 className="text-2xl text-indigo-200 font-bold mb-4">Welcome to Your Dashboard! 👋</h2>
            <p className="text-indigo-100 mb-6">
              Let&apos;s get you set up in just a few quick steps. We&apos;ll help you create your workspace.
            </p>
          </div>
        );

      case 'Account Setup':
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl text-indigo-200 font-bold mb-6 text-center">Tell us about yourself</h2>
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">
                  What best describes your role? *
                </label>
                <select 
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={formData.currentRole}
                  onChange={(e) => updateFormData({ currentRole: e.target.value })}
                  required
                >
                  <option value="">Select a role...</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Developer">Developer</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
        );

      case 'Use Case':
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl text-indigo-200 font-bold mb-6 text-center">Tell us about your use case</h2>
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">
                  What will you use this dashboard for? *
                </label>
                <textarea 
                  maxLength={120}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-indigo-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Please describe your use case..."
                  value={formData.useCase}
                  onChange={(e) => updateFormData({ useCase: e.target.value })}
                  required
                />
                <div className="text-xs text-indigo-300 mt-1">
                  {formData.useCase?.length || 0}/120 characters
                </div>
              </div>
          </div>
        );

      case 'Next':
        return (
          <div className="text-center">
            <h2 className="text-2xl text-indigo-200 font-bold mb-4">Congratulations!</h2>
            <p className="text-indigo-100 mb-6">
              You&apos;ve completed the onboarding process. You&apos;re now ready to move to the next step!
            </p>
            <div className="text-6xl mb-4">
              ✨
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 max-w-2xl w-full mx-4">
        <OnboardingIndicator steps={STEPS as unknown as string[]} currentStep={STEPS.indexOf(currentStep)} />
        <form onSubmit={handleSubmit} className="mt-6">
          {renderStep()}
          <div className="flex justify-between mt-8">
            {currentStep !== 'Welcome' && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="bg-gray-700/50 text-indigo-100 px-6 py-2 rounded-md hover:bg-gray-600/50 transition-colors font-medium"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              disabled={!isStepValid()}
              className={`px-6 py-2 rounded-md transition-colors ml-auto font-medium ${
                isStepValid()
                  ? 'bg-indigo-600/80 text-indigo-100 hover:bg-indigo-500/80'
                  : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === 'Next' ? 'Complete' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 