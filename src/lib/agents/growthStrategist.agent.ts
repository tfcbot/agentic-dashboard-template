import type { AgentConfig, OrderFormData, RequestGrowthStrategyInput } from '@/schemas';
import { agentService } from '@/services/agentService';

export const growthStrategistAgent: AgentConfig = {
    id: 'growth-strategist',
    name: 'Growth Strategist',
    title: 'SaaS Growth Expert',
    description: 'An expert in SaaS growth strategy and optimization',
    category: 'strategy',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format',
    credits: 20,
    available: true,
    keyDeliverables: [
        'Distribution channel strategy recommendations',
        'Customer journey optimization plan',
        'Early customer acquisition roadmap (0-10 customers)',
        'Growth scaling strategy (10-100 customers)',
        'Growth strategies'
    ],
    packageDescription: [
        'One Page Revenue Growth Strategy'
    ],
    estimatedDelivery: 'Less than 1 min',
    fields: {
        deliverableName: {
            type: 'text',
            label: 'Deliverable Name',
            required: true,
            placeholder: 'Enter in your deliverable name'
        },
        applicationIdea: {
            type: 'textarea',
            label: 'Application Idea',
            required: true,
            placeholder: 'Enter in your application idea'
        },
        idealCustomer: {
            type: 'text',
            label: 'Ideal Customer',
            required: true,
            placeholder: 'Enter in your ideal customer'
        },
        targetAnnualRevenue: {
            type: 'number',
            label: 'Target Annual Revenue ($)',
            required: true,
            placeholder: 'What is your target annual revenue?'
        }
    },
    faq: [
        {
            question: 'What is the purpose of this agent?',
            answer: 'This agent is designed to help you optimize your SaaS pricing and revenue strategy. It provides actionable advice based on your specific situation, considering factors such as business model, current customer base, and target price point.'
        }
    ],
    deliverable: {
        sections: [
            
            {
                id: 'distribution-channels',
                label: 'Distribution Channels',
                type: 'list',
                description: 'Recommended channels for customer acquisition',
                order: 1
            },
            {
                id: 'customer-journey',
                label: 'Customer Journey',
                type: 'text',
                description: 'Detailed customer journey optimization plan',
                order: 2
            },
            {
                id: 'first-10-customers',
                label: 'Your First 10 Customers',
                type: 'text',
                description: 'Strategy for acquiring early customers',
                order: 3
            },
            {
                id: 'first-100-customers',
                label: 'Your First 100 Customers',
                type: 'text',
                description: 'Scaling strategy for growth phase',
                order: 4
            },
            {
                id: 'growth-strategies',
                label: 'Growth Strategies',
                type: 'text',
                description: 'Key strategies for growth',
                order: 5
            }
        ],
        availableFormats: ['pdf', 'markdown'],
    },
    handler: async (token: string, data: OrderFormData) => {
        const response = await agentService.handleGrowthStrategyRequest(
            token,
            data.payload.formData as RequestGrowthStrategyInput
        );
        return response;
    }
}


