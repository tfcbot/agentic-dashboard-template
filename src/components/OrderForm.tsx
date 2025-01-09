'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { AgentService } from '@/services/agentService';
import { RetroLoadingOverlay } from './RetroLoadingOverlay';
import { validateOrderForm } from '@/lib/validation/orderForm';
import type { PackageTypeKey, OrderFormData, Payload } from '@/schemas/agent';
import type { FormErrors, FormTouched, OrderFormState, FrequencyType } from '@/schemas/forms';
import { apiService } from '@/services/api';

interface OrderFormProps {
  agentId: string;
  initialPackage: PackageTypeKey;
  initialPayload: Payload;
  onSubmit: (data: OrderFormData) => Promise<{ success: boolean; error?: string }>;
}

export function OrderForm({ agentId, initialPackage, onSubmit }: OrderFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState<OrderFormState>({
    payload: { formData: {} },
    packageType: initialPackage,
    agentId,
  });

  const validateField = (name: string, value: any) => {
    // Skip validation for agentId since it's a prop
    if (name === 'agentId') return '';

    const formDataToValidate = {
      payload: formData.payload,
      packageType: formData.packageType,
    };

    const result = validateOrderForm({ ...formDataToValidate, [name]: value });
    if (!result.success) {
      const fieldError = result.errors.find(err => err.path === name);
      return fieldError?.message || '';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    setAttemptedSubmit(true);

    // Validate all fields except agentId
    const formDataToValidate = {
      payload: formData.payload.formData,
      packageType: formData.packageType,
    };

    const validationResult = validateOrderForm(formDataToValidate);
    console.log('Validation result:', validationResult);
    
    if (!validationResult.success) {
      const newErrors: FormErrors = {};
      validationResult.errors.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      console.log('Validation failed:', newErrors);
      return;
    }

    // At this point, validation has passed, so we know all required fields are present
    const submissionData: OrderFormData = {
      payload: formData.payload,
      packageType: formData.packageType,
      agentId,
    };

    console.log('Submitting data:', submissionData);
    setIsSubmitting(true);
    setErrors({});

    try {
      // Add initial delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use the provided onSubmit handler or fall back to default apiService
      const result = await onSubmit(submissionData);
      
      console.log('Submission result:', result);
      
      if (!result.success) {
        if (result.error) {
          setErrors({ form: result.error });
        } else {
          setErrors({ form: 'Failed to submit purchase' });
        }
        console.log('Submission failed:', errors);
        return;
      }

      setIsSuccess(true);
      
      // Add delay before redirecting to show success state
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to homepage
      router.push('/');
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ form: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let parsedValue: any = value;


    setFormData((prev: OrderFormState) => ({ ...prev, [name]: parsedValue }));
    
    if (touched[name] || attemptedSubmit) {
      const error = validateField(name, parsedValue);
      setErrors((prev: FormErrors) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev: FormTouched) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof OrderFormState]);
    setErrors((prev: FormErrors) => ({ ...prev, [name]: error }));
  };

  const getInputClassName = (fieldName: string) => `
    w-full bg-gray-800 rounded-lg border 
    ${(touched[fieldName] || attemptedSubmit) && errors[fieldName] 
      ? 'border-red-500' 
      : 'border-gray-700'
    } 
    text-white p-3
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSubmitting && !isSuccess && <RetroLoadingOverlay />}
      {isSuccess && <RetroLoadingOverlay isSuccess />}

      {errors.form && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          {errors.form}
        </div>
      )}
      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        disabled={isSubmitting || isSuccess}
        onClick={() => console.log('Submit button clicked')}
      >
        {isSubmitting ? 'Processing...' : isSuccess ? 'Order Complete!' : 'Purchase'}
      </Button>
    </form>
  );
} 