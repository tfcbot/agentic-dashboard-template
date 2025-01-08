'use client';

import { useState } from 'react';
import { Button } from './ui/button';

import { useAgent } from '@/hooks/useAgents';
import type { PackageTypeKey, PackageType } from '@/schemas';
import { useRouter } from 'next/navigation';

interface PackageTiersProps {
  agentId: string;
  packages: PackageType[];
}

export function PackageTiers({ agentId, packages }: PackageTiersProps) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<PackageTypeKey>('basic');
  const { agent, loading } = useAgent(agentId);

  const formattedPackages = packages.reduce((acc, pkg) => {
    if (pkg.name) {
      const key = pkg.name.toLowerCase().replace(' strategy', '') as PackageTypeKey;
      return {
        ...acc,
        [key]: {
          name: pkg.name,
          credits: pkg.credits,
          features: pkg.features,
          deliveryTime: pkg.deliveryTime || 'Standard delivery'
        }
      };
    }
    return acc;
  }, {} as Record<PackageTypeKey, PackageType>);

  if (loading) {
    return <div>Loading packages...</div>;
  }

  const packageOptions = Object.entries(formattedPackages).map(([key, pkg]) => ({
    key: key as PackageTypeKey,
    name: pkg.name,
    credits: pkg.credits,
    deliveryTime: pkg.deliveryTime,
    features: pkg.features
  }));

  const handleStartNow = (packageType: PackageTypeKey) => {
    router.push(`/agent/${agentId}/intake?package=${packageType}`);
  };

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
      {packageOptions.map(({ key, credits, deliveryTime, features }) => (
        key === selectedPackage && (
          <div key={key} className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">${credits}</span>
                <span className="text-sm text-gray-400">per task</span>
              </div>
              <p className="mt-2 text-sm text-purple-400">{deliveryTime}</p>
            </div>

            {/* Features List */}
            <ul className="mb-8 space-y-4">
              {features.map((feature: string, index: number) => (
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
              onClick={() => handleStartNow(key)}
              variant="default"
            >
              Start Now
            </Button>
          </div>
        )
      ))}
    </div>
  );
} 