import {
    AgentConfig, 
    OrderFormData, 
    ValueStrategistRequest
} from '@/schemas/agent';
import { agentService } from '@/services/agentService';

export const saasValueStrategistAgent: AgentConfig = {
    id: '9d3f7a1e-5b2c-4e8d-a6f9-2c4b8d3e1a5f',
    name: 'Value Strategist',
    title: 'Value Strategist',
    description: 'Helps you turn your idea into a value spec document you can use with AI Tools',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format',
    credits: 10,
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
        url: {
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
                id: 'ideal-customer',
                label: 'Ideal Customer/Client',
                type: 'text'
            },
            {
                id: 'problem',
                label: 'Problem', 
                type: 'text'
            },
            {
                id: 'value-proposition',
                label: 'Value Proposition',
                type: 'text'
            },
            {
                id: 'profit-proposition',
                label: 'Profit Proposition Statement',
                type: 'text'
            },
            {
                id: 'people-proposition',
                label: 'People Proposition Statement',
                type: 'text'
            },
            {
                id: 'core-benefit',
                label: '1 Core Benefit',
                type: 'text'
            },
            {
                id: 'core-feature',
                label: '1 Core Feature',
                type: 'text'
            },
            {
                id: 'solution-overview',
                label: 'Solution Overview',
                type: 'text'
            },
            {
                id: 'benefit-breakdown',
                label: 'Benefit Breakdown',
                type: 'text'
            },
            {
                id: 'first-order',
                label: 'First Order Consequence',
                type: 'text'
            },
            {
                id: 'second-order',
                label: 'Second Order Consequence',
                type: 'text'
            },
            {
                id: 'pricing',
                label: 'Pricing Structure/Offer',
                type: 'text'
            }
        ],
        availableFormats: ['pdf', 'markdown']
    },
    handler: async (token: string, data: OrderFormData) => {
        const response = await agentService.handleValueStrategistRequest(
            token,
            data.payload.formData as ValueStrategistRequest
        );
        return response;
    }
}