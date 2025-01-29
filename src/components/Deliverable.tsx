'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { generateMarkdown, downloadFile } from '@/lib/fileGenerators';
import { DeliverableSections } from './deliverable/sections';
import { getAgent } from '@/lib/agents';
import type { DeliverableData, DeliverableSection } from '@/schemas/deliverable';

interface DeliverableProps {
  deliverable: DeliverableData;
}

export function Deliverable({ deliverable }: DeliverableProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const timestamp = new Date().toISOString().split('T')[0];
      const markdown = generateMarkdown(deliverable);
      downloadFile(markdown, `${deliverable.deliverableName}-${timestamp}.md`);
    } catch (error) {
      console.error('Error generating file:', error);
      alert('Failed to generate file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Get the agent configuration to determine section order
  const agent = getAgent(deliverable.agentId);

  
  if (!agent) {
    console.error('Agent configuration not found for ID:', deliverable.agentId);
    return null;
  }

  // Create a map of sections for easier lookup
  const sectionsMap = deliverable.deliverableContent.sections;


  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">{deliverable.deliverableName}</h2>
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? 'Downloading...' : 'Download as Markdown'}
        </Button>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="mb-8">
          <p className="text-gray-300">{deliverable.deliverableName}</p>
        </div>

        {agent.deliverable.sections.map((sectionConfig) => {
          const section = sectionsMap[sectionConfig.id];
          if (!section) return null;

          const SectionComponent = DeliverableSections[section.type as keyof typeof DeliverableSections];
          const sectionData = section.data;

          if (!SectionComponent || !sectionData) return null;

          return (
            <SectionComponent
              key={sectionConfig.id}
              data={sectionData}
              config={section}
            />
          );
        })}
      </div>
    </div>
  );
} 