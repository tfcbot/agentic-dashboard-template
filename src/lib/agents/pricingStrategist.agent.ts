import type { AgentConfig } from '@/schemas';

export const pricingStrategistAgent: AgentConfig = {
    id: 'pricing-strategist',
    name: 'Pricing Strategist',
    title: 'SaaS Pricing & Revenue Expert',
    description: 'An expert in SaaS pricing strategy and revenue optimization',
    category: 'strategy',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format',
    credits: 20,
    available: true,
    keyDeliverables: [
        'Distribution channel strategy recommendations',
        'Customer journey optimization plan',
        'Early customer acquisition roadmap (0-10 customers)',
        'Growth scaling strategy (10-100 customers)',
        'Revenue metrics and tracking routines'
    ],
    packageDescription: [
        'One Page Pricing Strategy'
    ],
    estimatedDelivery: 'Less than 1 min',
    fields: {
        businessModel: {
            type: 'select',
            label: 'Business Model',
            required: true,
            options: [
                { value: 'b2b', label: 'B2B' },
                { value: 'b2c', label: 'B2C' },
                { value: 'b2b2c', label: 'B2B2C' }
            ],
            placeholder: 'Select your business model'
        },
        currentCustomers: {
            type: 'number',
            label: 'Current Customer Count',
            required: true,
            placeholder: 'How many customers do you currently have?'
        },
        targetPrice: {
            type: 'number',
            label: 'Target Price Point ($)',
            required: true,
            placeholder: 'What is your target price point?'
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
                description: 'Recommended channels for customer acquisition'
            },
            {
                id: 'customer-journey',
                label: 'Customer Journey',
                type: 'text',
                description: 'Detailed customer journey optimization plan'
            },
            {
                id: 'first-10-customers',
                label: 'Your First 10 Customers',
                type: 'text',
                description: 'Strategy for acquiring early customers'
            },
            {
                id: 'first-100-customers',
                label: 'Your First 100 Customers',
                type: 'text',
                description: 'Scaling strategy for growth phase'
            },
            {
                id: 'growth-strategies',
                label: 'Growth Strategies',
                type: 'text',
                description: 'Key strategies for growth'
            }
        ],
        availableFormats: ['pdf', 'markdown'],
    },
    handler: function (args_0: string, args_1: { payload: { formData: {}; }; agentId: string; }, ...args_2: unknown[]): Promise<{ success: boolean; orderId: string; }> {
        throw new Error('Function not implemented.');
    }
}


