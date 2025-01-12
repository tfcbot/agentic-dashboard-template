import { AgentConfig, GetWebsiteReviewsResponseBody, OrderFormData, RequestWebsiteReviewBody } from '@/schemas';
import { AgentService } from '@/services/agentService';




export const getMockWebsiteReview = (): GetWebsiteReviewsResponseBody => {
  return {
    reviews: {
      reviewId: 'mock-review-id',
      review: {
        userId: 'mock-user-id',
        websiteUrl: 'https://www.example.com',
        createdAt: new Date().toISOString(),
        copywriting_analysis: {
          headline_effectiveness: {
            clarity: 'The headline clearly communicates the main value proposition',
            benefit_focused: 'Strong focus on customer benefits',
            urgency_factor: 'Creates moderate sense of urgency',
            emotional_appeal: 8
          },
          value_proposition: {
            unique_selling_points: ['Innovative features', 'Cost effective', 'Easy to use'],
            benefit_clarity: 'Benefits are clearly articulated',
            pain_point_addressing: 'Effectively addresses key customer pain points'
          },
          persuasion_elements: {
            social_proof: 'Good use of testimonials and case studies',
            credibility_indicators: 'Professional certifications and awards displayed',
            risk_reducers: 'Money-back guarantee and free trial offered'
          },
          call_to_action: {
            clarity: 'CTAs are clear and action-oriented',
            placement: 'Strategically placed throughout the page',
            compelling_factor: 'Strong value proposition in CTA copy'
          },
          content_engagement: {
            readability: 'Content is easy to read and scan',
            scannability: 'Good use of headers and bullet points',
            emotional_triggers: ['Trust', 'Security', 'Success']
          },
          conversion_optimization: {
            friction_points: ['Long form fields', 'Complex navigation'],
            trust_elements: 'Strong security badges and privacy policy'
          },
          recommendations: [
            'Simplify the signup process',
            'Add more customer testimonials',
            'Improve mobile responsiveness',
            'Enhance visual hierarchy'
          ]
        }
      }
    }
  }
};



export async function getMockWebsiteReviews(): Promise<GetWebsiteReviewsResponseBody> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const reviews = {
    reviewId: 'mock-review-id',
    review: {
      userId: 'mock-user-id',
      websiteUrl: 'https://www.example.com',
      createdAt: new Date().toISOString(),
      copywriting_analysis: {
        headline_effectiveness: {
          clarity: 'The headline clearly communicates the main value proposition',
          benefit_focused: 'Strong focus on customer benefits',
          urgency_factor: 'Creates moderate sense of urgency',
          emotional_appeal: 8
        },
        value_proposition: {
          unique_selling_points: ['Innovative features', 'Cost effective', 'Easy to use'],
          benefit_clarity: 'Benefits are clearly articulated',
          pain_point_addressing: 'Effectively addresses key customer pain points'
        },
        persuasion_elements: {
          social_proof: 'Good use of testimonials and case studies',
          credibility_indicators: 'Professional certifications and awards displayed',
          risk_reducers: 'Money-back guarantee and free trial offered'
        },
        call_to_action: {
          clarity: 'CTAs are clear and action-oriented',
          placement: 'Strategically placed throughout the page',
          compelling_factor: 'Strong value proposition in CTA copy'
        },
        content_engagement: {
          readability: 'Content is easy to read and scan',
          scannability: 'Good use of headers and bullet points',
          emotional_triggers: ['Trust', 'Security', 'Success']
        },
        conversion_optimization: {
          friction_points: ['Long form fields', 'Complex navigation'],
          trust_elements: 'Strong security badges and privacy policy'
        },
        recommendations: [
          'Simplify the signup process',
          'Add more customer testimonials',
          'Improve mobile responsiveness',
          'Enhance visual hierarchy'
        ]
      }
    }
  };
  return { reviews };
}