import type { AgentConfig } from '@/schemas';
import { valueStrategistAgent } from './valueStategist.agent';
import { techStrategistAgent } from './techStrategist.agent';
import { growthStrategistAgent } from './growthStrategist.agent';
import { emailSequenceWriterAgent } from './emailSequenceWriter.agent';

// Combine all agents into a single array
export const allAgents: AgentConfig[] = [
  valueStrategistAgent,
  techStrategistAgent,
  growthStrategistAgent,
  emailSequenceWriterAgent
];

// Provide a helper to find a specific agent by ID
export function getAgent(id: string): AgentConfig | undefined {
  return allAgents.find(agent => agent.id === id);
}

// Provide a helper to get all agents
export function getAllAgents(): AgentConfig[] {
  return [...allAgents];
}