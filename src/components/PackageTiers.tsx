'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { useAgentPurchase } from '@/hooks/useAgentPurchase';
import type { PackageTypeKey } from '@/types';

interface PackageTiersProps {
  agentId: string;
}

export function PackageTiers({ agentId }: PackageTiersProps) {
  const [selectedPackage, setSelectedPackage] = useState<PackageTypeKey>('basic');
  const { packageOptions, startPurchase, isLoading } = useAgentPurchase(agentId);

  if (isLoading) {
    return <div>Loading packages...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Package Tabs */}
      <div className="flex space-x-1 rounded-lg bg-gray-800 p-1">
        {packageOptions.map(({ key, name }) => (
          <button
            key={key}
            onClick={() => setSelectedPackage(key)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 ${
              key === selectedPackage
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Package Details */}
      {packageOptions.map(({ key, price, deliveryTime, features }) => (
        key === selectedPackage && (
          <div key={key} className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">${price}</span>
                <span className="text-sm text-gray-400">per task</span>
              </div>
              <p className="mt-2 text-sm text-purple-400">{deliveryTime}</p>
            </div>

            {/* Features List */}
            <ul className="mb-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg
                    className="mr-3 h-5 w-5 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => startPurchase(selectedPackage)}
            >
              Start Now
            </Button>
          </div>
        )
      ))}
    </div>
  );
} 