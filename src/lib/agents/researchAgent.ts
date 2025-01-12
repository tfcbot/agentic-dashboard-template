import { AgentConfig, OrderFormData, RequestResearchBody } from '@/schemas';
import { agentService, AgentService } from '@/services/agentService';

export const researchAgent: AgentConfig = {
    id: '3d813cbb-47fb-4d9d-9b7b-a5a04d8e6c9a',
    name: 'Research Assistant',
    title: 'Research and Analysis Expert',
    description: 'Expert research and analysis across academic and business domains',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    credits: 2500,
    available: true,
    rating: 4.8,
    keyDeliverables: [
      'Comprehensive research report',
      'Data analysis',
      'Recommendations'
    ],
    faq: [
      {
        question: 'What types of research can you help with?',
        answer: 'I can assist with academic research, market research, competitive analysis, literature reviews, and data-driven insights across various fields.'
      },
      {
        question: 'What format will I receive the research in?',
        answer: 'Research is delivered in a comprehensive report format with citations, methodology, key findings, and actionable insights.'
      }
    ],
    longDescription: 'Specialized in conducting thorough research across multiple domains. From academic papers to market analysis, I help gather, analyze and synthesize information to provide valuable insights.',
    additionalInfo: 'All research includes proper citations and follows academic standards when applicable',
    category: 'Research',
    fields: {
      topic: {
        label: 'Research Topic',
        type: 'text',
        placeholder: 'Describe your research topic or question...',
        validation: {
          min: 20,
          max: 2000
        },
        required: true
      }
    },
    packages: {
      basic: {
        name: 'Basic Research',
        credits: 3000,
        features: [
          'Literature review',
          'Basic data analysis',
          'Summary report'
        ],
        deliveryTime: '2 hours',
        requiredFields: ['topic'],
        optionalFields: []
      },
      standard: {
        name: 'Comprehensive Research',
        credits: 6000,
        features: [
          'Everything in Basic',
          'In-depth analysis',
          'Detailed methodology',
          'Recommendations'
        ],
        deliveryTime: '4 hours',
        requiredFields: ['topic'],
        optionalFields: []
      },
      priority: {
        name: 'Premium Research',
        credits: 12000,
        features: [
          'Everything in Standard',
          'Priority processing',
          'Expert consultation',
          'Follow-up support'
        ],
        deliveryTime: '2 hours',
        requiredFields: ['topic'],
        optionalFields: []
      }
    },
    handler: async (token: string, data: OrderFormData) => {
      console.log('Research Assistant Submission:', data);
       const response = await agentService.handleResearchSubmission(token, data.payload.formData as RequestResearchBody);
       return { success: true, orderId: response.researchId };
    }
}