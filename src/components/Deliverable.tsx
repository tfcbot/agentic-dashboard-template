'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { generateMarkdown, generatePDF, downloadFile } from '@/lib/fileGenerators';

interface DeliverableContent {
  overview: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  recommendations: string[];
}

interface DeliverableProps {
  title: string;
  summary: string;
  content: DeliverableContent;
  formats: string[];
  onRequestReview?: () => void;
}

export function Deliverable({ title, summary, content, formats, onRequestReview }: DeliverableProps) {
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const data = { title, summary, content };
      const timestamp = new Date().toISOString().split('T')[0];
      const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      if (selectedFormat === 'pdf') {
        const pdfBlob = generatePDF(data);
        downloadFile(pdfBlob, `${sanitizedTitle}-${timestamp}.pdf`);
      } else if (selectedFormat === 'markdown') {
        const markdown = generateMarkdown(data);
        downloadFile(markdown, `${sanitizedTitle}-${timestamp}.md`);
      } else if (selectedFormat === 'presentation') {
        // For now, we'll just download as markdown
        const markdown = generateMarkdown(data);
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
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400">{summary}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Overview</h3>
        <p className="text-gray-300">{content.overview}</p>
      </div>

      {content.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
          <p className="text-gray-300">{section.content}</p>
        </div>
      ))}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
        <ul className="list-disc list-inside space-y-2">
          {content.recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-300">{recommendation}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-800">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {formats.map((format) => (
              <option key={format} value={format}>
                 {format}
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
            Request Video Review
          </Button>
        )}
      </div>
    </div>
  );
} 