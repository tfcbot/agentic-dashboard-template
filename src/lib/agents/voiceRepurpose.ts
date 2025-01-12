import { AgentConfig, OrderFormData, RequestVoiceRepurposeBody } from '@/schemas';
import { agentService, AgentService } from '@/services/agentService';

export const voiceRepurposeAgent: AgentConfig = {
    id: '5e228d7b-c2a1-4e3f-9c8a-1b2b3c4d5e6f',
    name: 'AI Voice Coding Specialist',
    title: 'Voice-to-Specification AI Engineer',
    description: 'Transforms your voice recordings into detailed technical specifications for AI coding projects',
    category: 'Development',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    credits: 2500,
    available: true,
    keyDeliverables: [
        'Detailed technical specifications',
        'System architecture diagrams',
        'API documentation',
        'Implementation guidelines'
    ],
    rating: 4.8,
    longDescription: 'Perfect for developers who prefer verbal ideation and documentation. Our AI specialist converts your voice recordings into comprehensive technical specifications, making it easier to transform your ideas into actionable development plans.',
    additionalInfo: 'Supports multiple audio formats and can handle complex technical requirements across various AI frameworks and technologies.',
    fields: {
        projectDescription: {
            label: 'Project Description',
            type: 'textarea',
            placeholder: 'Describe your project requirements and goals...',
            validation: {
                min: 50,
                max: 2000
            },
            required: true
        },
        audioTranscript: {
            label: 'Audio Transcript',
            type: 'textarea',
            placeholder: 'Paste your audio transcript here...',
            validation: {
                min: 100,
                max: 5000
            },
            required: true
        },
        preferredFramework: {
            label: 'Preferred Framework/Technology',
            type: 'select',
            options: [
                { value: 'any', label: 'Any/Flexible' },
                { value: 'tensorflow', label: 'TensorFlow' },
                { value: 'pytorch', label: 'PyTorch' },
                { value: 'scikit', label: 'Scikit-learn' },
                { value: 'other', label: 'Other (specify in description)' }
            ],
            required: false
        }
    },
    faq: [
        {
            question: "What audio transcript format do you accept?",
            answer: "You can paste any text transcript of your voice recording. We recommend using professional transcription services or AI transcription tools for best results."
        },
        {
            question: "How detailed should my project description be?",
            answer: "The more detailed your description, the better. Include your project goals, technical requirements, constraints, and any specific preferences for implementation."
        }
    ],
    packages: {
        basic: {
            name: 'Basic Specification',
            credits: 2500,
            features: [
                'Voice recording transcription analysis',
                'Basic technical requirements',
                'High-level architecture outline',
                'Core functionality specification'
            ],
            deliveryTime: '4 hours',
            requiredFields: ['projectDescription', 'audioTranscript'],
            optionalFields: ['preferredFramework']
        },
        standard: {
            name: 'Detailed Specification',
            credits: 5000,
            features: [
                'Everything in Basic',
                'Detailed system architecture',
                'API specifications',
                'Data flow diagrams',
                'Implementation guidelines'
            ],
            deliveryTime: '8 hours',
            requiredFields: ['projectDescription', 'audioTranscript'],
            optionalFields: ['preferredFramework']
        },
        priority: {
            name: 'Premium Specification',
            credits: 10000,
            features: [
                'Everything in Standard',
                'Priority processing',
                'Interactive review session',
                'Alternative approaches analysis',
                'Risk assessment',
                'Maintenance guidelines'
            ],
            deliveryTime: '6 hours',
            requiredFields: ['projectDescription', 'audioTranscript'],
            optionalFields: ['preferredFramework']
        }
    },
    handler: async (token: string, data: OrderFormData) => {
        console.log('AI Voice Coding Specialist Submission:', data);
        const response = await agentService.handleVoiceRepurposeSubmission(token, data.payload.formData as RequestVoiceRepurposeBody);
        return { success: true, orderId: response.voiceRepurposeId };
    }
}