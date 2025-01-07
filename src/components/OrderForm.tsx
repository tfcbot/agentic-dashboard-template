'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { AgentService } from '@/services/agentService';
import { RetroLoadingOverlay } from './RetroLoadingOverlay';
import { validateOrderForm } from '@/lib/validation/orderForm';
import type { PackageTypeKey, OrderFormData } from '@/types/agent';
import type { FormErrors, FormTouched, OrderFormState, FrequencyType } from '@/types/forms';

interface OrderFormProps {
  agentId: string;
  initialPackage: PackageTypeKey;
}

export function OrderForm({ agentId, initialPackage }: OrderFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState<OrderFormState>({
    description: '',
    startDate: null,
    frequency: '',
    budget: undefined,
    packageType: initialPackage,
    agentId,
  });

  const validateField = (name: string, value: any) => {
    // Skip validation for agentId since it's a prop
    if (name === 'agentId') return '';

    const formDataToValidate = {
      description: formData.description,
      startDate: formData.startDate,
      frequency: formData.frequency,
      budget: formData.budget,
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
      description: formData.description,
      startDate: formData.startDate,
      frequency: formData.frequency,
      budget: formData.budget,
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
      description: formDataToValidate.description,
      startDate: formDataToValidate.startDate!,
      frequency: formDataToValidate.frequency as FrequencyType,
      budget: formDataToValidate.budget,
      packageType: formDataToValidate.packageType,
      agentId,
    };

    console.log('Submitting data:', submissionData);
    setIsSubmitting(true);
    setErrors({});

    try {
      // Add initial delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await AgentService.submitIntake(submissionData);
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

    // Parse special input types
    if (name === 'budget' && value) {
      parsedValue = parseFloat(value);
    } else if (name === 'startDate' && value) {
      parsedValue = new Date(value);
    }

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

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Description
        </label>
        <textarea
          name="description"
          className={getInputClassName('description')}
          value={formData.description}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Describe your project requirements..."
          disabled={isSubmitting || isSuccess}
        />
        {(touched.description || attemptedSubmit) && errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          className={getInputClassName('startDate')}
          value={formData.startDate ? formData.startDate.toISOString().split('T')[0] : ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={new Date().toISOString().split('T')[0]}
          disabled={isSubmitting || isSuccess}
        />
        {(touched.startDate || attemptedSubmit) && errors.startDate && (
          <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Frequency
        </label>
        <select
          name="frequency"
          className={getInputClassName('frequency')}
          value={formData.frequency}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isSubmitting || isSuccess}
        >
          <option value="">Select frequency</option>
          <option value="one-time">One Time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {(touched.frequency || attemptedSubmit) && errors.frequency && (
          <p className="mt-1 text-sm text-red-500">{errors.frequency}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Budget (Optional)
        </label>
        <input
          type="number"
          name="budget"
          className={getInputClassName('budget')}
          value={formData.budget || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Enter your budget"
          min="0"
          step="0.01"
          disabled={isSubmitting || isSuccess}
        />
        {(touched.budget || attemptedSubmit) && errors.budget && (
          <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
        )}
      </div>

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