"use client"
import { z } from 'zod';
import { OrderFormBase } from '@/components/OrderFormBase';
import type { AgentConfig, PackageTypeKey } from '@/schemas/agent';
import { FieldConfig } from '@/schemas/forms';
import { useAuth } from '@clerk/nextjs';
import { useAgent } from '@/hooks/useAgents';

interface AgentOrderFormProps {
  agentId: string;
  packageType: 'basic' | 'standard' | 'priority';
}

export function AgentOrderForm({ agentId, packageType }: AgentOrderFormProps) {
  const { agent, loading } = useAgent(agentId);
  const { getToken } = useAuth();
  
  if (loading || !agent) {
    return <div>Loading...</div>;
  }

  // Add package type validation
  if (!agent.packages || !agent.packages[packageType]) {
    return <div>Invalid package type selected</div>;
  }

  const selectedPackage = agent.packages[packageType];
  
  // Dynamically generate Zod schema from metadata
  const generateSchema = (metadata: AgentConfig, packageType: PackageTypeKey) => {
    console.log(metadata.packages[packageType].requiredFields);
    const fields = selectedPackage.requiredFields.reduce((acc: Record<string, z.ZodString>, fieldName: string) => {
      const field = metadata.fields[fieldName];
      let fieldSchema = z.string();

      // Apply validation rules from metadata
      if (field && field.validation) {
        if (field.validation.min) fieldSchema = fieldSchema.min(field.validation.min);
        if (field.validation.max) fieldSchema = fieldSchema.max(field.validation.max);
        if (field.validation.pattern) fieldSchema = fieldSchema.regex(new RegExp(field.validation.pattern));
      }

      return { ...acc, [fieldName]: fieldSchema };
    }, {});

    return z.object(fields);
  };

  // Generate field configs from metadata
    const generateFieldConfigs = (metadata: AgentConfig, packageType: PackageTypeKey) => {
    const requiredFields = selectedPackage.requiredFields;
    const optionalFields = selectedPackage.optionalFields;
    
    return [...requiredFields, ...optionalFields].reduce((acc, fieldName) => {
      const field = metadata.fields[fieldName];
      return {
        ...acc,
        [fieldName]: {
          label: field.label,
          type: field.type,
          placeholder: field.placeholder,
          options: field.options
        }
      };
    }, {});
  };

  const schema = generateSchema(agent, packageType);
  const fieldConfigs = generateFieldConfigs(agent, packageType);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    console.log("Handling submission for agent:", agentId);
    const token = await getToken();
    if (!token) {
      throw new Error('No token available');
    }
    const handler = agent.handler;
    if (!handler) {
      throw new Error('Invalid agent type');
    }
    console.log("Agent submission handler:", agentId);
    const result = await handler(token, {
      payload: {
        formData: data
      },
      packageType,
      agentId
    });
    return result.success
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">{agent.name}</h2>
        <p className="text-gray-300">{agent.description}</p>
        <div className="mt-4 p-3 bg-purple-900/50 rounded">
          <h3 className="font-semibold mb-2">
            Selected Package: {agent.packages[packageType].name}
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {agent.packages[packageType].features.map((feature: string, index: number) => (
              <li key={index} className="text-sm text-gray-300">{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      <OrderFormBase
        schema={schema}
        fieldConfigs={fieldConfigs as FieldConfig[]}
        onSubmit={handleSubmit}
        submitLabel={`Order Now (${agent.packages[packageType].credits} credits)`}
        loadingMessage="Creating your order..."
        successMessage="Order placed successfully!"
        redirectPath="/dashboard/orders"
      />
    </div>
  );
}