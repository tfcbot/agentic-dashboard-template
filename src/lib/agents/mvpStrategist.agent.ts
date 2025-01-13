import type { AgentConfig, OrderFormData } from '@/schemas';

export const mvpStrategistAgent: AgentConfig = {
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
        currentStack: {
            type: 'textarea',
            label: 'Current Technology Stack',
            required: true,
            placeholder: 'Describe your current technology stack and architecture'
        },
        teamSize: {
            type: 'number',
            label: 'Engineering Team Size',
            required: true,
            placeholder: 'How many engineers are on your team?'
        },
        challenges: {
            type: 'textarea',
            label: 'Technical Challenges',
            required: true,
            placeholder: 'What are your main technical challenges?'
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
                type: 'text'
            },
            {
                id: 'non-functional',
                label: 'Non Functional Requirements', 
                type: 'text'
            },
            {
                id: 'domain-model',
                label: 'Domain Model',
                type: 'text'
            },
            {
                id: 'data-model',
                label: 'Data Model',
                type: 'text'
            },
            {
                id: 'api-design',
                label: 'API Design',
                type: 'text'
            },
            {
                id: 'services-design',
                label: 'Services Design',
                type: 'text'
            },
            {
                id: 'deployment',
                label: 'Deployment Strategy',
                type: 'text'
            }
        ],
        availableFormats: ['pdf', 'markdown']
    },
    handler: async (token: string, data: OrderFormData) => {
        throw new Error('Handler not implemented');
    }
};
