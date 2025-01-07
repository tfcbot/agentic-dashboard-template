import { AgentService } from '@/services/agentService';
import { OrderForm } from '@/components/OrderForm';
import Link from 'next/link';
import type { PackageTypeKey } from '@/types/agent';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    package?: PackageTypeKey;
  };
}

export default async function IntakePage({ params, searchParams }: Props) {
  const response = await AgentService.getAgent(params.id);
  const packageType = (searchParams.package || 'basic') as PackageTypeKey;
  
  if (!response.success || !response.data) {
    return (
      <div className="text-red-500 text-center">
        Failed to load agent details. Please try again later.
      </div>
    );
  }

  const agent = response.data;
  const currentPackage = agent.packages[packageType];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href={`/agent/${params.id}`} className="flex items-center text-gray-400 hover:text-white mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Intake Form */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-white mb-8">Place Your Order</h1>
          <OrderForm 
            agentId={params.id} 
            initialPackage={packageType}
          />
        </div>

        {/* Package Details Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">☕</span>
              </div>
              <h2 className="text-xl font-semibold text-white ml-3">{currentPackage.name}</h2>
            </div>
            
            <p className="text-gray-300 mb-4">{agent.description}</p>
            
            <div className="flex items-center text-purple-400 mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {currentPackage.deliveryTime}
            </div>

            <ul className="space-y-3">
              {currentPackage.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 