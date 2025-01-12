import { AgentConfig } from '@/schemas/agent';

export const aiCodingStrategist: AgentConfig = {
    id: '7f9e4a2b-1d3c-5e8f-9b6a-8c7d2f1e3a4b',
    name: 'AI Coding Strategist',
    title: 'AI Coding Strategist',
    category: 'AI & Machine Learning',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    credits: 2,
    available: true,
    keyDeliverables: [
        'Executive Summary',
        'Project Overview',
        'Technical Architecture',
        'Implementation Timeline',
        'Resource Requirements'
    ],
    faq: [
        {
            question: 'What is an AI Project One-Pager?',
            answer: 'An AI Project One-Pager is a concise document that outlines the key aspects of your AI project, including its purpose, target audience, technical approach, and implementation plan.'
        },
        {
            question: 'How detailed should my project description be?',
            answer: 'Your project description should be thorough enough to convey the core concept and value proposition, but concise enough to fit a one-page format. Focus on the most important aspects that stakeholders need to understand.'
        },
        {
            question: 'What will I receive in the deliverable?',
            answer: 'You will receive a professionally formatted one-page document containing an executive summary, project overview, technical architecture recommendations, implementation timeline, and resource requirements tailored to your AI project.'
        }
    ], description: 'Generate comprehensive product specifications for your AI project, from value proposition to technical details.',
    packages: {
        basic: {
            name: 'Value Specification',
            credits: 49,
            deliveryTime: '24 hours',
            features: [
                'Customer pain point analysis',
                'Value proposition canvas',
                'Target market segmentation',
                'Competitive positioning',
                'Key benefits outline'
            ],
            requiredFields: [
                'project_name',
                'project_description',
                'target_audience'
            ],
            optionalFields: [
                'existing_solutions'
            ]
        },
        standard: {
            name: 'Value & Revenue Specification',
            credits: 99,
            deliveryTime: '48 hours',
            features: [
                'Everything in Value Specification',
                'Revenue model analysis',
                'Pricing strategy',
                'Market size calculation',
                'Sales channel strategy',
                'Financial projections'
            ],
            requiredFields: [
                'project_name',
                'project_description',
                'target_audience',
                'main_problems'
            ],
            optionalFields: [
                'existing_solutions'
            ]
        },
        priority: {
            name: 'Complete Product Specification',
            credits: 199,
            deliveryTime: '72 hours',
            features: [
                'Everything in Value & Revenue Specification',
                'Technical architecture overview',
                'Core features specification',
                'API requirements',
                'Data flow diagrams',
                'Technology stack recommendations',
                'Implementation roadmap'
            ],
            requiredFields: [
                'project_name',
                'project_description',
                'target_audience',
                'main_problems',
                'existing_solutions'
            ],
            optionalFields: []
        }
    },
    fields: {
        project_name: {
            label: 'Project Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your AI project name'
        },
        project_description: {
            label: 'Project Description',
            type: 'textarea',
            required: true,
            placeholder: 'Describe your AI project in detail'
        },
        target_audience: {
            label: 'Target Audience',
            type: 'textarea',
            required: true,
            placeholder: 'Who are your target users?'
        },
        main_problems: {
            label: 'Problems to Solve',
            type: 'textarea',
            required: true,
            placeholder: 'What key problems does your AI solution address?'
        },
        existing_solutions: {
            label: 'Existing Solutions',
            type: 'textarea',
            required: false,
            placeholder: 'What existing solutions or competitors are there?'
        }
    },

    handler: async (token, formData) => {
        console.log('Form Data:', formData);
        return { success: true };
    }
};

