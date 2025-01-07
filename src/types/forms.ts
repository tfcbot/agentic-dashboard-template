import { z } from 'zod';
import { OrderFormSchema } from '@/lib/validation/orderForm';
import { PackageTypeKey } from './agent';

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

export interface FormTouched {
    [key: string]: boolean;
}

export type FrequencyType = 'one-time' | 'weekly' | 'monthly';

export interface OrderFormState {
    description: string;
    startDate: Date | null;
    frequency: FrequencyType | '';
    budget?: number;
    packageType: PackageTypeKey;
    agentId: string;
} 