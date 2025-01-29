'use client';

import { useAgent } from '@/hooks/useAgents';
import { AgentServiceView } from '@/components/AgentServiceView';

export default function AgentServicePage({ params }: { params: { id: string } }) {
  const { agent, loading, error } = useAgent(params.id);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !agent) {
    return (
      <div className="text-red-500 text-center">
        Failed to load agent details. Please try again later.
      </div>
    );
  }

  return <AgentServiceView agentId={agent.id} />;
}