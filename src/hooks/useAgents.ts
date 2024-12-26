import { Agent } from '@/types';
import { useState, useEffect } from 'react';

// Mock data
const mockAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Sarah Mitchell",
    title: "Strategic Planning Consultant",
    description: "Expert strategist specializing in business growth and market expansion. Proven track record in developing comprehensive strategic plans, market analysis, and competitive positioning. Offering data-driven insights and actionable recommendations for sustainable growth.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    startingPrice: 750,
    available: true,
    keyDeliverables: [
      "Comprehensive Market Analysis Report",
      "Strategic Growth Roadmap (12-month plan)",
      "Competitive Analysis Dashboard",
      "Monthly Strategy Review Sessions"
    ]
  },
  {
    id: "agent-2",
    name: "Michael Turner",
    title: "Creative Copywriter & Content Strategist",
    description: "Versatile copywriter with expertise in brand storytelling and content strategy. Specializing in compelling marketing copy, website content, and brand messaging that drives engagement. Expert in SEO optimization and conversion-focused writing.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    startingPrice: 500,
    available: true,
    keyDeliverables: [
      "SEO-Optimized Website Copy (5 pages)",
      "Content Calendar (3-month plan)",
      "Email Marketing Sequence (6 emails)",
      "Brand Voice Guidelines Document"
    ]
  },
];

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAgents(mockAgents);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch agents'));
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return { agents, loading, error };
} 