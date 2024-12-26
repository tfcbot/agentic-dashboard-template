import Image from 'next/image';
import { Button } from './ui/button';

interface AgentCardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  available?: boolean;
  keyDeliverables: string[];
}

export function AgentCard({
  name,
  title,
  description,
  imageUrl,
  startingPrice,
  available = true,
  keyDeliverables,
}: AgentCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative h-12 w-12 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            className="rounded-full object-cover"
            fill
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-white">{name}</h3>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {available && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
            available
          </span>
        )}
        <span className="text-sm text-gray-400">
          Credits cost: {startingPrice}
        </span>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-3">{description}</p>

      <div className="mb-6 flex-grow">
        <h4 className="text-gray-300 text-sm font-medium mb-2">Key Deliverables:</h4>
        <ul className="space-y-1">
          {keyDeliverables.map((deliverable, index) => (
            <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              {deliverable}
            </li>
          ))}
        </ul>
      </div>

      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
        Hire
      </Button>
    </div>
  );
} 