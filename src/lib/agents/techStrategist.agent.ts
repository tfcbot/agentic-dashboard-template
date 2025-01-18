import type { AgentConfig, OrderFormData, RequestTechStrategyInput } from '@/schemas';
import { agentService } from '@/services/agentService';

export const techStrategistAgent: AgentConfig = {
    id: '7b9e4c1d-8f2a-4e8b-b3c5-9d6a2e1f8b4a',
    name: 'MVP Strategist',
    title: 'MVP Strategy & Architecture Expert',
    description: 'Expert guidance on technical strategy, architecture and engineering decisions',
    category: 'technology',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format',
    credits: 30,
    available: true,
    keyDeliverables: [
        'Technical architecture review',
        'Technology stack recommendations',
        'Engineering team structure plan',
        'Development process optimization',
        'Technical debt assessment'
    ],
    packageDescription: [
        'One Page MVP Strategy'
    ],
    estimatedDelivery: 'Less than 10 min',
    fields: {
        useCases: {
            type: 'textarea',
            label: 'Use Cases',
            required: true,
            placeholder: 'List the key use cases for your MVP'
        },
        nonFunctional: {
            type: 'textarea',
            label: 'Non Functional Requirements',
            required: true,
            placeholder: 'What are your non-functional requirements?'
        }
    },
    faq: [
        {
            question: 'What does a Fractional CTO do?',
            answer: 'A Fractional CTO provides part-time strategic technical leadership, helping with architecture decisions, technology choices, team structure, and development processes.'
        },
        {
            question: 'How can this help my startup?',
            answer: 'This service helps ensure you make sound technical decisions early on, avoid costly mistakes, and set up scalable engineering practices.'
        }
    ],
    deliverable: {
        sections: [
            {
                id: 'use-cases',
                label: 'Defining Use Cases',
                type: 'list',
                description: 'Key use cases and user stories for the MVP'
            },
            {
                id: 'non-functional',
                label: 'Non Functional Requirements', 
                type: 'list',
                description: 'Performance, security, and scalability requirements'
            },
            {
                id: 'domain-model',
                label: 'Domain Model',
                type: 'diagram',
                description: 'Core domain entities and their relationships'
            },
            {
                id: 'data-model',
                label: 'Data Model',
                type: 'diagram',
                description: 'Database schema and data relationships'
            },
            {
                id: 'api-design',
                label: 'API Design',
                type: 'text',
                description: 'API endpoints and integration points'
            },
            {
                id: 'services-design',
                label: 'Services Design',
                type: 'diagram',
                description: 'Microservices architecture and communication'
            },
            {
                id: 'deployment',
                label: 'Deployment Strategy',
                type: 'text',
                description: 'Infrastructure and deployment recommendations'
            }
        ],
        availableFormats: ['pdf', 'markdown']
    },
    handler: async (token: string, data: OrderFormData) => {
        const response = await agentService.handleTechStrategyRequest(
            token,
            data.payload.formData as RequestTechStrategyInput
        );
        return response;
    }
};
