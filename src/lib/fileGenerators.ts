import type { AgentConfig } from '@/schemas/agent';
import type { DeliverableData, DeliverableSection } from '@/schemas/deliverable';

const renderMarkdownSection = (section: DeliverableSection, data: any): string => {
  switch (section.type) {
    case 'text':
      return `## ${section.label}\n\n${data}\n\n`;
    
    case 'list':
      return `## ${section.label}\n\n${data.map((item: string) => `- ${item}`).join('\n')}\n\n`;
    
    case 'table':
      if (!Array.isArray(data) || !data.length) return '';
      const headers = Object.keys(data[0]);
      const headerRow = `| ${headers.join(' | ')} |`;
      const separator = `| ${headers.map(() => '---').join(' | ')} |`;
      const rows = data.map(row => `| ${headers.map(h => row[h]).join(' | ')} |`).join('\n');
      return `## ${section.label}\n\n${headerRow}\n${separator}\n${rows}\n\n`;
    
    case 'metrics':
      return `## ${section.label}\n\n${Object.entries(data)
        .map(([key, value]) => `- **${key}**: ${value}`)
        .join('\n')}\n\n`;
    
    case 'recommendations':
      return `## ${section.label}\n\n${data.map((rec: string, i: number) => `${i + 1}. ${rec}`).join('\n')}\n\n`;

    case 'diagram':
      return `## ${section.label}\n\n\`\`\`mermaid\n${data}\n\`\`\`\n\n`;
    
    default:
      return '';
  }
};

export const generateMarkdown = (data: DeliverableData): string => {
  let markdown = `# ${data.deliverableName}\n\n`;

  Object.values(data.deliverableContent.sections).forEach(section => {
    markdown += renderMarkdownSection(section, section.data);
  });

  return markdown;
};

export const downloadFile = (content: string | Blob, filename: string) => {
  const blob = content instanceof Blob ? content : new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}; 