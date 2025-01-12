import type { AgentConfig } from '@/schemas';
import { websiteReviewAgent } from './websiteReviewAgent';
import { voiceRepurposeAgent } from './voiceRepurpose';
import { researchAgent } from './researchAgent';

// Combine all agents into a single array
export const allAgents: AgentConfig[] = [
  websiteReviewAgent,
  researchAgent,
  voiceRepurposeAgent,
];

// Provide a helper to find a specific agent by ID
export function getAgent(id: string): AgentConfig | undefined {
  return allAgents.find(agent => agent.id === id);
}

// Provide a helper to get all agents
export function getAllAgents(): AgentConfig[] {
  return [...allAgents];
}