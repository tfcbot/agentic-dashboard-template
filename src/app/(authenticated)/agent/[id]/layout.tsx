'use client';

import { AgentProvider } from '@/context/AgentContext';

export default function AgentLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: { agentId: string }
}) {
  // Only wrap routes that need agent data with the provider
  return (
    <AgentProvider initialAgentId={params.agentId}>
      {children}
    </AgentProvider>
  );
}