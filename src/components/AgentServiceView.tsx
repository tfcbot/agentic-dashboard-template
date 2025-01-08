'use client';

import Link from 'next/link';
import {  useAgent } from '@/hooks/useAgents';
import { PackageTiers } from './PackageTiers';
import { StarRating } from './StarRating';

interface AgentServiceViewProps {
  agentId: string;
}

export function AgentServiceView({ agentId }: AgentServiceViewProps) {
  const { agent, loading, error } = useAgent(agentId);


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                <div className="h-20 bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="h-96 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center p-8 bg-red-900/20 rounded-lg">
          Failed to load agent details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="flex items-center text-gray-400 hover:text-white mb-8">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Agent Info */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">{agent.name}</h1>

          {/* Rating */}
          {agent.rating && (
            <div className="mb-6">
              <StarRating rating={agent.rating} />
            </div>
          )}

          {/* Description */}
          <div className="space-y-6 text-gray-300">
            {agent.longDescription && <p>{agent.longDescription}</p>}
            {agent.additionalInfo && <p>{agent.additionalInfo}</p>}
          </div>

          {/* FAQ Section */}
          {agent.faq && agent.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
              <div className="space-y-6">
                {agent.faq.map((item: { question: string; answer: string }, index: number) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Package Tiers */}
        <div>
          {agent.packages && (
            <PackageTiers 
              packages={Object.values(agent.packages)} 
              agentId={agent.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}