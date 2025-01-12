import { jsPDF } from 'jspdf';
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
    
    default:
      return '';
  }
};

const renderPDFSection = (doc: jsPDF, section: DeliverableSection, data: any, startY: number): number => {
  let currentY = startY;

  // Helper function to add wrapped text
  const addWrappedText = (text: string, y: number) => {
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, 15, y);
    return y + (splitText.length * 7);
  };

  // Add section header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(section.label, 15, currentY);
  currentY += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);

  switch (section.type) {
    case 'text':
      currentY = addWrappedText(data, currentY);
      break;

    case 'list':
      data.forEach((item: string) => {
        currentY = addWrappedText(`• ${item}`, currentY);
        currentY += 5;
      });
      break;

    case 'table':
      if (!Array.isArray(data) || !data.length) break;
      const headers = Object.keys(data[0]);
      const cellWidth = 180 / headers.length;
      
      // Headers
      headers.forEach((header, i) => {
        doc.text(header, 15 + (i * cellWidth), currentY);
      });
      currentY += 7;

      // Rows
      data.forEach(row => {
        headers.forEach((header, i) => {
          doc.text(String(row[header]), 15 + (i * cellWidth), currentY);
        });
        currentY += 7;
      });
      break;

    case 'metrics':
      Object.entries(data).forEach(([key, value]) => {
        currentY = addWrappedText(`${key}: ${value}`, currentY);
        currentY += 5;
      });
      break;

    case 'recommendations':
      data.forEach((rec: string, i: number) => {
        currentY = addWrappedText(`${i + 1}. ${rec}`, currentY);
        currentY += 5;
      });
      break;
  }

  return currentY + 10;
};

export const generateMarkdown = (data: DeliverableData, agent: AgentConfig): string => {
  let markdown = `# ${data.title}\n\n`;
  markdown += `## Summary\n${data.summary}\n\n`;

  agent.deliverable.sections.forEach(section => {
    const sectionData = data.content.sections[section.id]?.data;
    if (sectionData) {
      markdown += renderMarkdownSection(section, sectionData);
    }
  });

  if (data.content.metadata) {
    markdown += '\n## Additional Information\n\n';
    Object.entries(data.content.metadata).forEach(([key, value]) => {
      markdown += `**${key}**: ${value}\n`;
    });
  }

  return markdown;
};

export const generatePDF = (data: DeliverableData, agent: AgentConfig): Blob => {
  const doc = new jsPDF();
  let currentY = 20;

  // Title
  doc.setFontSize(20);
  doc.text(data.title, 15, currentY);
  currentY += 15;

  // Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', 15, currentY);
  currentY += 10;
  doc.setFont('helvetica', 'normal');
  const splitSummary = doc.splitTextToSize(data.summary, 180);
  doc.text(splitSummary, 15, currentY);
  currentY += splitSummary.length * 7 + 10;

  // Sections
  agent.deliverable.sections.forEach(section => {
    const sectionData = data.content.sections[section.id]?.data;
    if (sectionData) {
      // Check if we need a new page
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      currentY = renderPDFSection(doc, section, sectionData, currentY);
    }
  });

  // Metadata if exists
  if (data.content.metadata) {
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Information', 15, currentY);
    currentY += 10;
    doc.setFont('helvetica', 'normal');
    Object.entries(data.content.metadata).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 15, currentY);
      currentY += 7;
    });
  }

  return doc.output('blob');
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