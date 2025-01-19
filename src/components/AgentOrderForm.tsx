"use client"
import { z } from 'zod';
import { OrderFormBase } from '@/components/OrderFormBase';
import type { AgentConfig } from '@/schemas/agent';
import { FieldConfig } from '@/schemas/forms';
import { useAuth } from '@clerk/nextjs';
import { useAgent } from '@/hooks/useAgents';

interface AgentOrderFormProps {
  agentId: string;
}

export function AgentOrderForm({ agentId }: AgentOrderFormProps) {
  const { agent, loading } = useAgent(agentId);
  const { getToken } = useAuth();
  
  if (loading || !agent) {
    return <div>Loading...</div>;
  }
  
  // Dynamically generate Zod schema from metadata
  const generateSchema = (metadata: AgentConfig) => {
    const fields = Object.keys(metadata.fields).reduce((acc: Record<string, z.ZodString>, fieldName: string) => {
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
  const generateFieldConfigs = (metadata: AgentConfig) => {
    return Object.keys(metadata.fields).reduce((acc, fieldName) => {
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

  const schema = generateSchema(agent);
  const fieldConfigs = generateFieldConfigs(agent);

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
      agentId,
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
            Service Details
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {agent.keyDeliverables.map((feature: string, index: number) => (
              <li key={index} className="text-sm text-gray-300">{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      <OrderFormBase
        schema={schema}
        fieldConfigs={fieldConfigs as FieldConfig[]}
        onSubmit={handleSubmit}
        submitLabel={`Order Now (${agent.credits} credits)`}
        loadingMessage="Creating your order..."
        successMessage="Order placed successfully!"
        redirectPath="/orders"
      />
    </div>
  );
}