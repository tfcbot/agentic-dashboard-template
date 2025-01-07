'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { AgentService } from '@/services/agentService';
import { RetroLoadingOverlay } from './RetroLoadingOverlay';
import type { PackageTypeKey } from '@/types/agent';

interface OrderFormProps {
  agentId: string;
  initialPackage: PackageTypeKey;
}

interface FormErrors {
  [key: string]: string;
}

export function OrderForm({ agentId, initialPackage }: OrderFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    description: '',
    schedule: '',
    access: [] as string[],
    packageType: initialPackage,
    agentId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Add initial delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await AgentService.submitIntake(formData);
      
      if (!result.success) {
        if (result.error) {
          setErrors({ form: result.error });
        } else {
          setErrors({ form: 'Failed to submit purchase' });
        }
        return;
      }

      // Show success state
      setIsSuccess(true);
      
      // Add delay before redirecting to show success state
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to agent page
      router.push(`/agent/${agentId}`);
      
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      access: [e.target.value],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Show loading overlay during submission */}
      {isSubmitting && !isSuccess && <RetroLoadingOverlay />}
      
      {/* Show success overlay after successful submission */}
      {isSuccess && <RetroLoadingOverlay isSuccess />}

      {/* Show error message if submission failed */}
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
          className={`w-full h-32 bg-gray-800 rounded-lg border ${
            errors.description ? 'border-red-500' : 'border-gray-700'
          } text-white p-3`}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your project requirements..."
          disabled={isSubmitting || isSuccess}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Schedule
        </label>
        <input
          type="text"
          name="schedule"
          className={`w-full bg-gray-800 rounded-lg border ${
            errors.schedule ? 'border-red-500' : 'border-gray-700'
          } text-white p-3`}
          value={formData.schedule}
          onChange={handleInputChange}
          placeholder="Preferred schedule or deadline"
          disabled={isSubmitting || isSuccess}
        />
        {errors.schedule && (
          <p className="mt-1 text-sm text-red-500">{errors.schedule}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Access Requirements
        </label>
        <select
          name="access"
          className={`w-full bg-gray-800 rounded-lg border ${
            errors.access ? 'border-red-500' : 'border-gray-700'
          } text-white p-3`}
          onChange={handleAccessChange}
          value={formData.access[0] || ''}
          disabled={isSubmitting || isSuccess}
        >
          <option value="">Select access level</option>
          <option value="read">Read Only</option>
          <option value="write">Read & Write</option>
          <option value="admin">Full Admin Access</option>
        </select>
        {errors.access && (
          <p className="mt-1 text-sm text-red-500">{errors.access}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? 'Processing...' : isSuccess ? 'Order Complete!' : 'Purchase'}
      </Button>
    </form>
  );
} 