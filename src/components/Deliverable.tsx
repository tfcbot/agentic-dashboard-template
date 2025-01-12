'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { generateMarkdown, generatePDF, downloadFile } from '@/lib/fileGenerators';
import { DeliverableSections } from './deliverable/sections';
import type { AgentConfig } from '@/schemas/agent';
import type { DeliverableData } from '@/schemas/deliverable';

interface DeliverableProps {
  agentId: string;
  data: DeliverableData;
  agent: AgentConfig;
  onRequestReview?: () => void;
}

export function Deliverable({ agentId, data, agent, onRequestReview }: DeliverableProps) {
  const [selectedFormat, setSelectedFormat] = useState(agent.deliverable.availableFormats[0]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const timestamp = new Date().toISOString().split('T')[0];
      const sanitizedTitle = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      if (selectedFormat === 'pdf') {
        const pdfBlob = generatePDF(data, agent);
        downloadFile(pdfBlob, `${sanitizedTitle}-${timestamp}.pdf`);
      } else if (selectedFormat === 'markdown') {
        const markdown = generateMarkdown(data, agent);
        downloadFile(markdown, `${sanitizedTitle}-${timestamp}.md`);
      } else if (selectedFormat === 'presentation') {
        // For now, we'll just download as markdown
        const markdown = generateMarkdown(data, agent);
        downloadFile(markdown, `${sanitizedTitle}-${timestamp}-presentation.md`);
      }
    } catch (error) {
      console.error('Error generating file:', error);
      alert('Failed to generate file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{data.title}</h2>
        <p className="text-gray-400">{data.summary}</p>
      </div>

      {agent.deliverable.sections.map((sectionConfig) => {
        const SectionComponent = DeliverableSections[sectionConfig.type];
        const sectionData = data.content.sections[sectionConfig.id]?.data;

        if (!sectionData || !SectionComponent) return null;

        return (
          <SectionComponent
            key={sectionConfig.id}
            data={sectionData}
            config={sectionConfig}
          />
        );
      })}

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-800">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value as any)}
            className="bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {agent.deliverable.availableFormats.map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? 'Generating...' : 'Download'}
          </Button>
        </div>
        
        {onRequestReview && (
          <Button
            onClick={onRequestReview}
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/10 w-full sm:w-auto"
          >
            Request Expert Review
          </Button>
        )}
      </div>
    </div>
  );
} 