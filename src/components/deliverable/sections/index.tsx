'use client';

import { DeliverableSection } from '@/schemas/deliverable';
import dynamic from 'next/dynamic';
import Mermaid from '@/components/Mermaid';

interface SectionProps {
  data: any;
  config: DeliverableSection;
}

const SectionWrapper = ({ children, label, description }: { children: React.ReactNode; label: string; description?: string }) => (
  <div className="mb-12 bg-gradient-to-b from-gray-800/50 to-transparent rounded-lg p-6 border border-gray-700/50 backdrop-blur-sm">
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-white tracking-tight">{label}</h3>
      {description && (
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{description}</p>
      )}
    </div>
    {children}
  </div>
);

function TextSection({ data, config }: SectionProps) {
  return (
    <SectionWrapper label={config.label} description={config.description}>
      <p className="text-gray-300 leading-relaxed">{data}</p>
    </SectionWrapper>
  );
}

function ListSection({ data, config }: SectionProps) {
  return (
    <SectionWrapper label={config.label} description={config.description}>
      <ul className="space-y-3">
        {Array.isArray(data) && data.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

function TableSection({ data, config }: SectionProps) {
  if (!Array.isArray(data) || !data.length) return null;
  
  const headers = Object.keys(data[0]);
  
  return (
    <SectionWrapper label={config.label} description={config.description}>
      <div className="overflow-x-auto -mx-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700/50">
              {headers.map((header) => (
                <th key={header} className="py-3 px-6 text-gray-400 font-medium text-sm uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                {headers.map((header) => (
                  <td key={header} className="py-3 px-6 text-gray-300">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

function MetricsSection({ data, config }: SectionProps) {
  return (
    <SectionWrapper label={config.label} description={config.description}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors">
            <div className="text-sm text-gray-400 mb-1">{key}</div>
            <div className="text-2xl font-semibold text-white">
              {typeof value === 'number' ? value.toLocaleString() : String(value)}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function RecommendationsSection({ data, config }: SectionProps) {
  return (
    <SectionWrapper label={config.label} description={config.description}>
      <div className="space-y-6">
        {Array.isArray(data) && data.map((rec, index) => (
          <div key={index} className="flex gap-4 items-start group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-colors">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed">{rec}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function DiagramSection({ data, config }: SectionProps) {
  return (
    <SectionWrapper label={config.label} description={config.description}>
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
        <Mermaid chart={data} id={config.id} />
      </div>
    </SectionWrapper>
  );
}

export const DeliverableSections = {
  text: TextSection,
  list: ListSection,
  table: TableSection,
  metrics: MetricsSection,
  recommendations: RecommendationsSection,
  diagram: DiagramSection,
}; 