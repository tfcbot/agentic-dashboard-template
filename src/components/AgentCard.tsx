'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { StarRating } from '@/components/StarRating';
import { Agent } from '@/schemas/agent';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  console.log('AgentCard rendering with:', {
    agent,
    hasAgent: !!agent,
    type: typeof agent,
    keys: agent ? Object.keys(agent) : []
  });

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

      <Link href={`/agent/${agent.id}`} prefetch className="w-full">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          View Packages
        </Button>
      </Link>
    </div>
  );
} 