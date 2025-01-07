'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useAgentMetadata } from '@/hooks/useAgentMetadata';
import { StarRating } from '@/components/StarRating';

interface AgentCardProps {
  agentId: string;
}

export function AgentCard({ agentId }: AgentCardProps) {
  const { data: agent, isLoading } = useAgentMetadata(agentId);

  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 flex flex-col h-full animate-pulse">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-12 w-12 flex-shrink-0 bg-gray-800 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-800 rounded w-1/2" />
            <div className="h-3 bg-gray-800 rounded w-1/3" />
          </div>
        </div>
        <div className="h-3 bg-gray-800 rounded w-1/4 mb-4" />
        <div className="h-16 bg-gray-800 rounded mb-4" />
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-3 bg-gray-800 rounded w-1/3" />
          <div className="h-3 bg-gray-800 rounded w-3/4" />
          <div className="h-3 bg-gray-800 rounded w-2/3" />
        </div>
        <div className="h-10 bg-gray-800 rounded" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
        <p className="text-red-500">Failed to load agent data</p>
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

      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          agent.availability.status === 'available'
            ? 'bg-green-900 text-green-300'
            : agent.availability.status === 'busy'
            ? 'bg-yellow-900 text-yellow-300'
            : 'bg-red-900 text-red-300'
        }`}>
          {agent.availability.status}
        </span>
        <span className="text-sm text-gray-400">
          Starting at ${agent.startingPrice}
        </span>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-3">{agent.shortDescription}</p>

      <div className="mb-6 flex-grow">
        <h4 className="text-gray-300 text-sm font-medium mb-2">Key Features:</h4>
        <ul className="space-y-1">
          {agent.packages.basic.features.slice(0, 3).map((feature, index) => (
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