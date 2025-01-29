'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { DynamicForm } from '@/components/DynamicForm';
import type { FieldConfig, OrderFormConfig } from '@/schemas/forms';

export function OrderFormBase<T extends z.ZodType>({
  schema,
  fieldConfigs,
  onSubmit,
  initialData = {},
  submitLabel = 'Submit',
  loadingMessage = 'Processing...',
  successMessage = 'Order Complete!',
  redirectPath = '/'
}: OrderFormConfig) {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await onSubmit(data);
      // Add delay before redirecting to show success state
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push(redirectPath);
    } catch (error) {
      console.error('Submission error:', error);
      throw error; // Let DynamicForm handle the error display
    }
  };

  return (
    <DynamicForm
      schema={schema}
      fieldConfigs={fieldConfigs as FieldConfig[]}
      onSubmit={handleSubmit}
      initialData={initialData}
      submitLabel={submitLabel}
      loadingMessage={loadingMessage}
      successMessage={successMessage}
    />
  );
} 