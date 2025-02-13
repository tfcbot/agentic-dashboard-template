import React from 'react';

interface OnboardingIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function OnboardingIndicator({ steps, currentStep }: OnboardingIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div 
              className={`
                h-2 w-2 rounded-full transition-all duration-300 ease-in-out
                ${index === currentStep ? 'w-8 bg-primary' : 
                  index < currentStep ? 'bg-primary' : 'bg-gray-200'}
              `}
            />
            {index < steps.length - 1 && (
              <div 
                className={`
                  h-[2px] w-4 transition-colors duration-300
                  ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="ml-4 text-sm font-medium text-gray-600">
        {steps[currentStep]}
      </div>
    </div>
  );
} 