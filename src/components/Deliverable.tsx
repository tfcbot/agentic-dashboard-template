'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { generateMarkdown, downloadFile } from '@/lib/fileGenerators';
import { DeliverableSections } from './deliverable/sections';
import { VideoRoastModal } from './VideoRoastModal';
import type { DeliverableData, DeliverableSection } from '@/schemas/deliverable';

interface DeliverableProps {
  deliverable: DeliverableData;
  onRequestReview?: () => void;
}

export function Deliverable({ deliverable, onRequestReview }: DeliverableProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRoastModalOpen, setIsRoastModalOpen] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const timestamp = new Date().toISOString().split('T')[0];
      const markdown = generateMarkdown(deliverable);
      downloadFile(markdown, `${deliverable.deliverableContent.deliverableName}-${timestamp}.md`);
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
        <h2 className="text-2xl font-bold text-white">{deliverable.deliverableContent.deliverableName}</h2>
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
          <h3 className="text-lg font-semibold text-white mb-4">Title</h3>
          <p className="text-gray-300">{deliverable.deliverableContent.deliverableName}</p>
        </div>

        {Object.values(deliverable.deliverableContent.sections).map((section: DeliverableSection & { type: keyof typeof DeliverableSections }) => {
          const SectionComponent = DeliverableSections[section.type];
          const sectionData = section.data;

          if (!SectionComponent || !sectionData) return null;

          return (
            <SectionComponent
              key={section.id}
              data={sectionData}
              config={section}
            />
          );
        })}
      </div>

      <VideoRoastModal
        isOpen={isRoastModalOpen}
        onClose={() => setIsRoastModalOpen(false)}
        onSelect={handleRoastOptionSelect}
      />
    </div>
  );
} 