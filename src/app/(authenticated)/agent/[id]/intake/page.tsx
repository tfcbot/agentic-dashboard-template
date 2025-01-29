import { AgentOrderForm } from '@/components/AgentOrderForm';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default async function IntakePage({ params }: Props) {
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
        {/* Order Form */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-white mb-8">Place Your Order</h1>
          <AgentOrderForm 
            agentId={params.id}
          />
        </div>
      </div>
    </div>
  );
}