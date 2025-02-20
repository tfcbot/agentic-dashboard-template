'use client';

import Link from 'next/link';
import { useAgent } from '@/hooks/useAgents';
import { Package } from './Package';
import { StarRating } from './StarRating';

interface AgentServiceViewProps {
  agentId: string;
}

export function AgentServiceView({ agentId }: AgentServiceViewProps) {
  const { agent, loading, error } = useAgent(agentId);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button Skeleton */}
        <div className="flex items-center text-gray-400 mb-8">
          <div className="w-5 h-5 bg-gray-700 rounded mr-2 animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div className="flex items-center gap-4">
              <div className="h-8 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6 animate-pulse"></div>
            </div>

            {/* Key Deliverables */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              <div className="h-6 bg-gray-700 rounded w-2/5 mb-4 animate-pulse"></div>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Package Details */}
          <div>
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
              {/* Price */}
              <div className="flex justify-end items-baseline gap-2 mb-6">
                <div className="h-8 bg-gray-700 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-12 animate-pulse"></div>
              </div>

              {/* Estimated Delivery */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-48 animate-pulse"></div>
              </div>

              {/* Package Features */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                ))}
              </div>
            </div>
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
        Back to Agents
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Details */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-white">{agent.title}</h1>
            {agent.rating && <StarRating rating={agent.rating} />}
          </div>

          <p className="text-gray-300 mb-8">{agent.description}</p>

          {/* Key Deliverables */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">What you get</h2>
            <ul className="space-y-3">
              {agent.keyDeliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Section */}
          {agent.faq && agent.faq.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {agent.faq.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium text-white mb-2">{item.question}</h3>
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Package Details */}
        <div>
          <Package agentId={agentId} />
        </div>
      </div>
    </div>
  );
}