'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { generateMarkdown, downloadFile } from '@/lib/fileGenerators';
import { DeliverableSections } from './deliverable/sections';
import { VideoRoastModal } from './VideoRoastModal';
import type { AgentConfig } from '@/schemas/agent';
import type { DeliverableData } from '@/schemas/deliverable';

interface DeliverableProps {
  agentId: string;
  data: DeliverableData;
  agent: AgentConfig;
  onRequestReview?: () => void;
}

export function Deliverable({ agentId, data, agent, onRequestReview }: DeliverableProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRoastModalOpen, setIsRoastModalOpen] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const timestamp = new Date().toISOString().split('T')[0];
      const sanitizedTitle = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const markdown = generateMarkdown(data, agent);
      downloadFile(markdown, `${sanitizedTitle}-${timestamp}.md`);
    } catch (error) {
      console.error('Error generating file:', error);
      alert('Failed to generate file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRoastOptionSelect = (option: any) => {
    setIsRoastModalOpen(false);
    if (onRequestReview) {
      onRequestReview();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">{data.title}</h2>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setIsRoastModalOpen(true)}
          >
            Request Video Roast
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : 'Download as Markdown'}
          </Button>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
          <p className="text-gray-300">{data.summary}</p>
        </div>

        {agent.deliverable.sections.map((section) => {
          const SectionComponent = DeliverableSections[section.type];
          const sectionData = data.content.sections[section.id]?.data;

          if (!SectionComponent || !sectionData) return null;

          return (
            <SectionComponent
              key={section.id}
              data={sectionData}
              config={section}
            />
          );
        })}

        {data.content.metadata && (
          <div className="mt-8 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">
              Additional Information
            </h3>
            <dl className="space-y-2">
              {Object.entries(data.content.metadata).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-gray-400">{key}</dt>
                  <dd className="text-gray-300 ml-4">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <VideoRoastModal
        isOpen={isRoastModalOpen}
        onClose={() => setIsRoastModalOpen(false)}
        onSelect={handleRoastOptionSelect}
      />
    </div>
  );
} 