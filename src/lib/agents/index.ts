import type { AgentConfig } from '@/schemas';
import { saasValueStrategistAgent } from './valueStategist.agent';
import { mvpStrategistAgent } from './mvpStrategist.agent';
import { revenueStrategistAgent } from './growthStrategist.agent';
// Combine all agents into a single array
export const allAgents: AgentConfig[] = [
  saasValueStrategistAgent,
  mvpStrategistAgent,
  revenueStrategistAgent
];

// Provide a helper to find a specific agent by ID
export function getAgent(id: string): AgentConfig | undefined {
  return allAgents.find(agent => agent.id === id);
}

// Provide a helper to get all agents
export function getAllAgents(): AgentConfig[] {
  return [...allAgents];
}