import type { AgentConfig, OrderFormData, RequestEmailSequenceInput } from '@/schemas';
import { agentService } from '@/services/agentService';

export const emailSequenceWriterAgent: AgentConfig = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Email Sequence Writer',
    title: 'Professional Email Sequence Writer',
    description: 'Create tailored email sequences for your ideal customer profile and specific goals.',
    category: 'Content Writing',
    imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80&auto=format',
    credits: 50,
    available: true,
    keyDeliverables: [
        'Custom Email Sequences',
        'Tailored Messaging',
        'High Engagement Emails'
    ],
    rating: 4.8,
    longDescription: 'The Email Sequence Writer specializes in crafting high-converting email sequences. Whether it\'s a Welcome Sequence, Sales Sequence, Onboarding Sequence, or Engagement Sequence, this agent ensures the emails resonate with your target audience and meet your business goals.',
    additionalInfo: 'Perfect for businesses looking to improve email marketing performance.',
    packageDescription: [
        'Custom email sequences based on your ideal customer profile.',
        'Includes subject lines, email body, and optional call-to-action.',
        'Delivered in a clear and structured format.'
    ],
    estimatedDelivery: '3-5 business days',
    fields: {
        deliverableName: {
            type: 'text',
            label: 'Deliverable Name',
            required: true,
            placeholder: 'Enter your deliverable name'
        },
        idealCustomerProfile: {
            type: 'text',
            label: 'Ideal Customer Profile',
            required: true,
            placeholder: 'Enter your ideal customer profile'
        },
        emailSequenceType: {
            type: 'select',
            label: 'Email Sequence Type',
            required: true,
            options: [
                { value: 'Welcome Sequence', label: 'Welcome Sequence' },
                { value: 'Sales Sequence', label: 'Sales Sequence' },
                { value: 'Onboarding Sequence', label: 'Onboarding Sequence' },
                { value: 'Engagement Sequence', label: 'Engagement Sequence' }
            ]
        },
    },
    faq: [
        {
            question: 'What is included in the email sequence?',
            answer: 'Each sequence includes professionally written emails with subject lines, email body, and optional calls-to-action tailored to your audience.'
        },
        {
            question: 'Can I provide specific requests for the emails?',
            answer: 'Yes, you can include additional notes with specific instructions or preferences for the email content.'
        }
    ],
    deliverable: {
        sections: [
            {
                id: 'targetAudience',
                type: 'text',
                label: 'Target Audience',
                order: 1,
            },
            {
                id: 'emails',
                type: 'markdown',
                label: 'Emails',
                order: 2,
            },
        ],
        availableFormats: ['pdf', 'markdown', 'presentation'],
    },
    handler: async (token: string, data: OrderFormData) => {
        const response = await agentService.handleEmailSequenceRequest(
            token,
            data.payload.formData as RequestEmailSequenceInput
        );
        return response;
    }
} 