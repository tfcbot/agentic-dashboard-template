import {
    AgentConfig, 
    OrderFormData, 
    RequestValueStrategyInput, 
} from '@/schemas/agent';
import { agentService } from '@/services/agentService';

export const valueStrategistAgent: AgentConfig = {
    id: '9d3f7a1e-5b2c-4e8d-a6f9-2c4b8d3e1a5f',
    name: 'Value Strategist',
    title: 'Value Strategist',
    description: 'Helps you turn your idea into a value spec document you can use with AI Tools',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format',
    credits: 20,
    available: true,
    rating: 4.8,
    category: 'Business',
    keyDeliverables: [
        'Breakdown of Core Benefits',
        'Clear Proposition Statements',
        'Pricing Suggestions'
    ], 
    packageDescription: [
        'One Page Value Specification',
        'Available as PDF or Markdown', 
        'Downloadable and ready to use'
    ],
    estimatedDelivery: 'Less than 1 min',
    longDescription: 'Comprehensive strategic planning services...',
    additionalInfo: 'Available for both short-term and long-term engagements',
    faq: [
        {
            question: 'What is your typical process?',
            answer: 'The AI agent analyzes your inputs about your application idea, target customer, problem, and solution to create a formalized value specification document. This document clearly articulates your value propositions and target market.'
        },
        {
            question: 'Why is creating value propositions important before development?',
            answer: 'Having clear value propositions before starting development helps ensure you build the right thing for the right people. It helps validate your idea, align development priorities with customer needs, and create a strong foundation for product decisions. This can save significant time and resources by preventing development of features that don\'t deliver real value.'
        },
        {
            question: 'What can I do with the value specification document?',
            answer: 'The value specification document serves as a strategic blueprint that you can use to guide development, create marketing materials, pitch to stakeholders, or feed into other AI tools for generating user stories, wireframes, or technical specifications. It helps maintain focus on delivering real customer value throughout the development process.'
        }
    ],
    fields: {
        deliverableName: {
            type: 'text',
            label: 'Deliverable Name',
            required: true,
            placeholder: 'Enter in your deliverable name'
        },
        applicationIdea: {
            label: 'Application Idea',
            type: 'textarea',
            placeholder: 'Enter in your application idea',
            validation: { min: 10, max: 999 },
            required: true
        }, 
        idealCustomer: {
            label: 'Ideal Customer',
            type: 'text',
            placeholder: 'Enter in your ideal customer',
            required: true
        }, 
        problem: {
            label: 'Problem',
            type: 'text',
            placeholder: 'Enter in the problem you are solving',
            required: true
        }, 
        solution: {
            label: 'Solution',
            type: 'text',
            placeholder: 'Enter in the solution you are providing',
            required: true
        }
    },
    deliverable: {
        sections: [
            {
                id: 'applicationIdea',
                label: 'Application Idea',
                type: 'text',
                description: 'Description of the application idea',
                order: 1
            },
            {
                id: 'idealCustomer',
                label: 'Ideal Customer',
                type: 'text', 
                description: 'Description of the ideal customer',
                order: 2
            },
            {
                id: 'problem',
                label: 'Problem',
                type: 'text',
                description: 'The core problem being solved',
                order: 3
            },
            {
                id: 'valueProposition',
                label: 'Value Proposition',
                type: 'text',
                description: 'Your core value proposition statement',
                order: 4
            },
            {
                id: 'profitProposition',
                label: 'Profit Proposition',
                type: 'text',
                description: 'How your solution generates profit',
                order: 5
            },
            {
                id: 'peopleProposition',
                label: 'People Proposition',
                type: 'text',
                description: 'How your solution benefits people',
                order: 6
            },
            {
                id: 'coreBenefit',
                label: 'Core Benefit',
                type: 'text',
                description: 'The primary benefit users get',
                order: 7
            },
            {
                id: 'coreFeature',
                label: 'Core Feature',
                type: 'text',
                description: 'The main feature that delivers value',
                order: 8
            },
            {
                id: 'solutionOverview',
                label: 'Solution Overview',
                type: 'text',
                description: 'Overview of how your solution works',
                order: 9
            },
            {
                id: 'benefitBreakdown',
                label: 'Benefit Breakdown',
                type: 'list',
                description: 'List of key benefits',
                order: 10
            },
            {
                id: 'firstOrderConsequence',
                label: 'First Order Consequence',
                type: 'text',
                description: 'Immediate impact of using your solution',
                order: 11
            },
            {
                id: 'secondOrderConsequence',
                label: 'Second Order Consequence',
                type: 'text',
                description: 'Long-term impact of using your solution',
                order: 12
            }
        ],
        availableFormats: ['pdf', 'markdown']
    },
    handler: async (token: string, data: OrderFormData) => {
        const response = await agentService.handleValueStrategyRequest(
            token,
            data.payload.formData as RequestValueStrategyInput
        );
        return response;
    }
}