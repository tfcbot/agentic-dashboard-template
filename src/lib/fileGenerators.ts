import { jsPDF } from 'jspdf';

interface DeliverableContent {
  overview: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  recommendations: string[];
}

interface DeliverableData {
  title: string;
  summary: string;
  content: DeliverableContent;
}

export const generateMarkdown = (data: DeliverableData): string => {
  const { title, summary, content } = data;
  const { overview, sections, recommendations } = content;

  let markdown = `# ${title}\n\n`;
  markdown += `## Summary\n${summary}\n\n`;
  markdown += `## Overview\n${overview}\n\n`;

  sections.forEach(section => {
    markdown += `## ${section.title}\n${section.content}\n\n`;
  });

  markdown += '## Recommendations\n';
  recommendations.forEach(rec => {
    markdown += `- ${rec}\n`;
  });

  return markdown;
};

export const generatePDF = (data: DeliverableData): Blob => {
  const doc = new jsPDF();
  const { title, summary, content } = data;
  const { overview, sections, recommendations } = content;

  // Helper function to add wrapped text
  const addWrappedText = (text: string, y: number) => {
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, 15, y);
    return y + (splitText.length * 7);
  };

  // Title
  doc.setFontSize(20);
  doc.text(title, 15, 20);

  // Summary
  doc.setFontSize(12);
  let currentY = 40;
  doc.setFont(undefined, 'bold');
  doc.text('Summary', 15, currentY);
  doc.setFont(undefined, 'normal');
  currentY = addWrappedText(summary, currentY + 10);

  // Overview
  currentY += 10;
  doc.setFont(undefined, 'bold');
  doc.text('Overview', 15, currentY);
  doc.setFont(undefined, 'normal');
  currentY = addWrappedText(overview, currentY + 10);

  // Sections
  sections.forEach(section => {
    currentY += 10;
    doc.setFont(undefined, 'bold');
    doc.text(section.title, 15, currentY);
    doc.setFont(undefined, 'normal');
    currentY = addWrappedText(section.content, currentY + 10);

    // Add new page if we're running out of space
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
  });

  // Recommendations
  currentY += 10;
  doc.setFont(undefined, 'bold');
  doc.text('Recommendations', 15, currentY);
  doc.setFont(undefined, 'normal');
  currentY += 10;

  recommendations.forEach(rec => {
    currentY = addWrappedText(`• ${rec}`, currentY + 7);
    
    // Add new page if we're running out of space
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
  });

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