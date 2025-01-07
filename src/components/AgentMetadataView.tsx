'use client';

import { useAgentMetadata } from '@/hooks/useAgentMetadata';
import { StarRating } from './StarRating';

interface AgentMetadataViewProps {
  agentId: string;
}

export function AgentMetadataView({ agentId }: AgentMetadataViewProps) {
  const { data: metadata, isLoading, error } = useAgentMetadata(agentId);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-red-900/20 rounded-lg p-4">
        Failed to load agent metadata. Please try again later.
      </div>
    );
  }

  if (!metadata) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-6">
        <img
          src={metadata.imageUrl}
          alt={metadata.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{metadata.name}</h1>
          <p className="text-gray-400">{metadata.title}</p>
          <div className="flex items-center gap-4">
            <StarRating rating={metadata.rating} />
            <span className="text-sm text-gray-400">
              {metadata.metrics.completedTasks} tasks completed
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300">{metadata.shortDescription}</p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Response Time</div>
          <div className="text-lg font-semibold text-white">
            {metadata.metrics.averageResponseTime}
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Satisfaction Rate</div>
          <div className="text-lg font-semibold text-white">
            {metadata.metrics.satisfactionRate}%
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Starting At</div>
          <div className="text-lg font-semibold text-white">
            ${metadata.startingPrice}
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            metadata.availability.status === 'available'
              ? 'bg-green-500'
              : metadata.availability.status === 'busy'
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
        />
        <span className="text-sm text-gray-400 capitalize">
          {metadata.availability.status}
          {metadata.availability.nextAvailableSlot && metadata.availability.status !== 'available' && (
            <> · Available {new Date(metadata.availability.nextAvailableSlot).toLocaleDateString()}</>
          )}
        </span>
      </div>
    </div>
  );
} 