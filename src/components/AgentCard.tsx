'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { AgentConfig } from '@/schemas/agent';
import { useRouter } from 'next/navigation';

interface AgentCardProps {
  agent: AgentConfig;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

  if (!agent || typeof agent !== 'object') {
    console.error('Invalid agent data received:', agent);
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
        <p className="text-red-500">Failed to load agent data</p>
        <p className="text-gray-400 text-sm">Received: {JSON.stringify(agent)}</p>
      </div>
    );
  }

  const requiredProps = ['id', 'name', 'title', 'description', 'imageUrl', 'keyDeliverables'];
  const missingProps = requiredProps.filter(prop => !(prop in agent));
  
  if (missingProps.length > 0) {
    console.error('Missing required properties:', missingProps);
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
        <p className="text-red-500">Invalid agent data structure</p>
        <p className="text-gray-400 text-sm">Missing: {missingProps.join(', ')}</p>
      </div>
    );
  }

  const handleViewPackage = async () => {
    setIsLoading(true);
    router.push(`/agent/${agent.id}`);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative h-12 w-12 flex-shrink-0">
          <Image
            src={agent.imageUrl}
            alt={agent.name}
            className="rounded-full object-cover"
            fill
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-white">{agent.name}</h3>
          <p className="text-gray-400 text-sm">{agent.title}</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-3">{agent.description}</p>

      <div className="mb-6 flex-grow">
        <h4 className="text-gray-300 text-sm font-medium mb-2">Key Features:</h4>
        <ul className="space-y-1">
          {agent.keyDeliverables.slice(0, 3).map((feature: string, index: number) => (
            <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button 
        onClick={handleViewPackage}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        ) : (
          'View Package'
        )}
      </Button>
    </div>
  );
} 