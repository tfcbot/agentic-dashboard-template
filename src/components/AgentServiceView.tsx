'use client';

import Link from 'next/link';
import { PackageTiers } from './PackageTiers';
import { StarRating } from './StarRating';
import type { Agent } from '@/types/agent';

interface AgentServiceViewProps {
  agent: Agent;
}

export function AgentServiceView({ agent }: AgentServiceViewProps) {
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
          <div className="mb-6">
            <StarRating rating={agent.rating} />
          </div>

          {/* Description */}
          <div className="space-y-6 text-gray-300">
            <p>{agent.longDescription}</p>
            <p>{agent.additionalInfo}</p>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
            <div className="space-y-6">
              {agent.faq.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Package Tiers */}
        <div>
          <PackageTiers packages={agent.packages} agentId={agent.id} />
        </div>
      </div>
    </div>
  );
} 