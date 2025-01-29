import { z } from 'zod';
import { FieldConfigSchema } from '@/schemas/forms';


export const OrderFormSchema = z.object({
  fieldConfigs: FieldConfigSchema,
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