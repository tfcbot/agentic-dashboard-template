import { z } from 'zod';
import { PackageTypeKey } from '@/types/agent';

export const OrderFormSchema = z.object({
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  schedule: z
    .string()
    .min(5, 'Schedule must be at least 5 characters')
    .max(200, 'Schedule must not exceed 200 characters'),
  access: z
    .array(z.string())
    .min(1, 'Please select at least one access level')
    .max(3, 'Maximum of 3 access levels allowed'),
  packageType: z.enum(['basic', 'standard', 'priority'] as const, {
    required_error: 'Please select a package',
  }),
  agentId: z.string().uuid('Invalid agent ID'),
});

export type OrderFormSchema = z.infer<typeof OrderFormSchema>;

interface ValidationSuccess {
  success: true;
  data: OrderFormSchema;
}

interface ValidationError {
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