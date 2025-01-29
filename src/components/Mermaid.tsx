'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  id?: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontSize: '14px',
    primaryColor: '#9333ea', // purple-600
    primaryTextColor: '#fff',
    primaryBorderColor: '#9333ea',
    lineColor: '#4b5563', // gray-600
    secondaryColor: '#1f2937', // gray-800
    tertiaryColor: '#111827', // gray-900
  }
});

export default function Mermaid({ chart, id }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = id || Math.random().toString(36).substring(7);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render(`mermaid-${uniqueId}`, chart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Failed to render diagram:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = '<div class="text-red-500">Failed to render diagram</div>';
          }
        }
      }
    };

    renderDiagram();
  }, [chart, uniqueId]);

  return (
    <div ref={containerRef} className="mermaid-container overflow-x-auto" />
  );
} 