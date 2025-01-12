import { z } from 'zod';
import { OrderFormSchema } from '@/lib/validation/orderForm';
import { Payload } from './agent';

export type OrderForm = z.infer<typeof OrderFormSchema>;

export interface ValidationSuccess {
    success: true;
    data: OrderForm;
}

export interface ValidationError {
    success: false;
    errors: Array<{
        path: string;
        message: string;
    }>;
}

export type ValidationResult = ValidationSuccess | ValidationError;

export interface FormErrors {
    [key: string]: string;
}

export interface FormTouched {
    [key: string]: boolean;
}

export type FrequencyType = 'one-time' | 'weekly' | 'monthly';

export interface OrderFormState {
    payload: Payload;
    agentId: string;
}

export const OrderFormBaseSchema = z.object({
    additionalContext: z.string().min(10, 'Description must be at least 10 characters'),
    agentId: z.string()
});

export const FieldConfigSchema = z.object({
    label: z.string(),
    type: z.enum(['text', 'textarea', 'select', 'number', 'email']),
    options: z.array(z.object({
      label: z.string(),
      value: z.any()
    })).optional(),
    placeholder: z.string().optional(),
    required: z.boolean().optional()
});

export const OrderFormConfigSchema = z.object({
  schema: z.instanceof(z.ZodType),
  fieldConfigs: z.array(FieldConfigSchema),
  onSubmit: z.function().args(z.any()).returns(z.promise(z.boolean())),
  initialData: z.record(z.string(), z.any()).optional(),
  submitLabel: z.string().optional(),
  loadingMessage: z.string().optional(), 
  successMessage: z.string().optional(),
  redirectPath: z.string().optional()
});

export type OrderFormBase = z.infer<typeof OrderFormBaseSchema>;
export type FieldConfig = z.infer<typeof FieldConfigSchema>;
export type OrderFormConfig = z.infer<typeof OrderFormConfigSchema>;