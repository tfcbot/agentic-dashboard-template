import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import { RetroLoadingOverlay } from './RetroLoadingOverlay';
import { FieldConfig } from '@/schemas/forms';

interface DynamicFormProps<T extends z.ZodType> {
  schema: T;
  fieldConfigs: FieldConfig[];
  onSubmit: (data: z.infer<T>) => Promise<void>;
  initialData?: Partial<z.infer<T>>;
  submitLabel?: string;
  loadingMessage?: string;
  successMessage?: string;
}

export function DynamicForm<T extends z.ZodType>({
  schema,
  fieldConfigs,
  onSubmit,
  initialData = {},
  submitLabel = 'Submit',
  loadingMessage = 'Processing...',
  successMessage = 'Complete!'
}: DynamicFormProps<T>) {
  const [formData, setFormData] = useState<any>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const result = schema.safeParse({ ...formData, [name]: value });
      if (!result.success) {
        const fieldError = result.error.errors.find(err => err.path[0] === name);
        setErrors(prev => ({ 
          ...prev, 
          [name]: fieldError?.message || 'Invalid input'
        }));
      } else {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const result = schema.safeParse({ ...formData, [name]: formData[name] });
    if (!result.success) {
      const fieldError = result.error.errors.find(err => err.path[0] === name);
      setErrors(prev => ({ 
        ...prev, 
        [name]: fieldError?.message || 'Invalid input' 
      }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = schema.parse(formData);
      await onSubmit(validatedData);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (name: string, config: FieldConfig) => {
    const commonProps = {
      id: name,
      name,
      value: formData[name] || '',
      onChange: (e: React.ChangeEvent<any>) => handleInputChange(name, e.target.value),
      onBlur: () => handleBlur(name),
      className: `w-full bg-gray-800 rounded-lg border ${
        touched[name] && errors[name] ? 'border-red-500' : 'border-gray-700'
      } text-white p-3`,
      placeholder: config.placeholder,
      disabled: isSubmitting || isSuccess
    };

    switch (config.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={4} />;
      
      case 'select':
        return (
          <select {...commonProps}>
            {config.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return <input {...commonProps} type={config.type} />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSubmitting && !isSuccess && <RetroLoadingOverlay isLoading={isSubmitting} />}
      {isSuccess && <RetroLoadingOverlay isSuccess={isSuccess} />}

      {errors.form && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          {errors.form}
        </div>
      )}

      {Object.entries(fieldConfigs).map(([name, config]) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {config.label}
          </label>
          {renderField(name, config)}
          {touched[name] && errors[name] && (
            <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? loadingMessage : isSuccess ? successMessage : submitLabel}
      </Button>
    </form>
  );
}