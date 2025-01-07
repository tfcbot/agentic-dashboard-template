import { z } from 'zod';
import { PackageTypeKey } from '@/types';

// Helper function to validate future dates
const isFutureDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

export const OrderFormSchema = z.object({
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  startDate: z
    .date()
    .refine(isFutureDate, 'Start date must be in the future'),
  frequency: z
    .enum(['one-time', 'weekly', 'monthly'] as const, {
      required_error: 'Please select a frequency',
    }),
  budget: z
    .number()
    .positive('Budget must be greater than 0')
    .optional(),
  packageType: z.enum(['basic', 'standard', 'priority'] as const, {
    required_error: 'Please select a package',
  })
});

export type OrderFormSchema = z.infer<typeof OrderFormSchema>;

export interface ValidationSuccess {
  success: true;
  data: OrderFormSchema;
}

export interface ValidationError {
  success: false;
  errors: Array<{
    path: string;
    message: string;
  }>;
}

export type ValidationResult = ValidationSuccess | ValidationError;

export const validateOrderForm = (data: unknown): ValidationResult => {
  try {
    const validatedData = OrderFormSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      return { success: false, errors };
    }
    return { 
      success: false, 
      errors: [{ path: 'form', message: 'Invalid form data' }] 
    };
  }
}; 