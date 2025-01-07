import { AgentServiceView } from '@/components/AgentServiceView';
import { AgentService } from '@/services/agentService';

interface Props {
  params: {
    id: string;
  };
}

export default async function AgentServicePage({ params }: Props) {
  const response = await AgentService.getAgent(params.id);
  
  if (!response.success || !response.data) {
    return (
      <div className="text-red-500 text-center">
        Failed to load agent details. Please try again later.
      </div>
    );
  }

  return <AgentServiceView agent={response.data} />;
} 