import { z } from 'zod';
import { OrderFormSchema } from '@/lib/validation/orderForm';

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

export interface FormErrors {
    [key: string]: string;
} 