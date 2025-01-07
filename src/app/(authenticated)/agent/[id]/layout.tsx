'use client';

import { useEffect } from 'react';
import { AgentProvider } from '@/context/AgentContext';
import { AgentService } from '@/services/agentService';

interface AgentLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export default function AgentLayout({ children, params }: AgentLayoutProps) {
  return (
    <AgentProvider initialAgentId={params.id}>
      {children}
    </AgentProvider>
  );
} 