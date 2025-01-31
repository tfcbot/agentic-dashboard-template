'use client';

import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Components } from 'react-markdown';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

interface MarkdownProps {
  content: string;
  className?: string;
}

export default function Markdown({ content, className = '' }: MarkdownProps) {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      if (!match) {
        return <code className={className} {...props}>{children}</code>;
      }

      // Only pass safe props to SyntaxHighlighter
      const syntaxHighlighterProps: SyntaxHighlighterProps = {
        language,
        style: vscDarkPlus as any,
        PreTag: "div",
        children: String(children).replace(/\n$/, '')
      };

      return (
        <SyntaxHighlighter {...syntaxHighlighterProps} />
      );
    },
    // Style adjustments for dark mode and email sequence formatting
    p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
    h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-6 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-semibold text-white mb-4 mt-6">{children}</h2>,
    h3: ({ children }) => (
      <h3 className="text-lg font-medium text-white mb-3 mt-6 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-purple-500"></span>
        {children}
      </h3>
    ),
    h4: ({ children }) => <h4 className="text-base font-medium text-white mb-2 mt-4">{children}</h4>,
    h5: ({ children }) => <h5 className="text-sm font-medium text-white mb-2 mt-4">{children}</h5>,
    h6: ({ children }) => <h6 className="text-sm font-medium text-white mb-2 mt-4">{children}</h6>,
    a: ({ children, href }) => (
      <a href={href} className="text-purple-400 hover:text-purple-300 underline">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-300">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-gray-800/30 rounded-r italic text-gray-400">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="border-gray-700 my-6" />,
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
    // Special handling for email sequence sections
    div: ({ className, children, ...props }) => {
      if (className?.includes('email-sequence')) {
        return (
          <div className="bg-gray-800/30 rounded-lg p-6 mb-6 border border-gray-700/50" {...props}>
            {children}
          </div>
        );
      }
      return <div className={className} {...props}>{children}</div>;
    },
  };

  return (
    <ReactMarkdown 
      className={`prose prose-invert max-w-none ${className} space-y-4`}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
