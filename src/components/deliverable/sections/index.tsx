'use client';

import { DeliverableSection } from '@/schemas/deliverable';
import dynamic from 'next/dynamic';
import Mermaid from '@/components/Mermaid';

interface SectionProps {
  data: any;
  config: DeliverableSection;
}

function TextSection({ data, config }: SectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{config.label}</h3>
      <p className="text-gray-300">{data}</p>
      {config.description && (
        <p className="text-gray-400 text-sm mt-2">{config.description}</p>
      )}
    </div>
  );
}

function ListSection({ data, config }: SectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{config.label}</h3>
      <ul className="list-disc list-inside space-y-2">
        {Array.isArray(data) && data.map((item, index) => (
          <li key={index} className="text-gray-300">{item}</li>
        ))}
      </ul>
      {config.description && (
        <p className="text-gray-400 text-sm mt-2">{config.description}</p>
      )}
    </div>
  );
}

function TableSection({ data, config }: SectionProps) {
  if (!Array.isArray(data) || !data.length) return null;
  
  const headers = Object.keys(data[0]);
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{config.label}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              {headers.map((header) => (
                <th key={header} className="py-2 px-4 text-gray-400 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-800">
                {headers.map((header) => (
                  <td key={header} className="py-2 px-4 text-gray-300">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {config.description && (
        <p className="text-gray-400 text-sm mt-2">{config.description}</p>
      )}
    </div>
  );
}

function MetricsSection({ data, config }: SectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{config.label}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">{key}</div>
            <div className="text-xl font-semibold text-white mt-1">
              {typeof value === 'number' ? value.toLocaleString() : String(value)}
            </div>
          </div>
        ))}
      </div>
      {config.description && (
        <p className="text-gray-400 text-sm mt-2">{config.description}</p>
      )}
    </div>
  );
}

function RecommendationsSection({ data, config }: SectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{config.label}</h3>
      <div className="space-y-4">
        {Array.isArray(data) && data.map((rec, index) => (
          <div key={index} className="flex gap-3 items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center">
              {index + 1}
            </div>
            <p className="text-gray-300">{rec}</p>
          </div>
        ))}
      </div>
      {config.description && (
        <p className="text-gray-400 text-sm mt-2">{config.description}</p>
      )}
    </div>
  );
}

function DiagramSection({ data, config }: SectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{config.label}</h3>
      <div className="bg-gray-800 p-4 rounded-lg">
        <Mermaid chart={data} id={config.id} />
      </div>
      {config.description && (
        <p className="text-gray-400 text-sm mt-2">{config.description}</p>
      )}
    </div>
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