'use client';

import ReactMarkdown from 'react-markdown';

interface IRagAssistantMarkdownProps {
  content: string;
}

export function RagAssistantMarkdown({ content }: IRagAssistantMarkdownProps): React.JSX.Element {
  return (
    <div className="text-sm leading-relaxed text-neutral [&_p+_p]:mt-2">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="whitespace-pre-wrap">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => <ul className="mt-2 list-disc space-y-1 pl-4">{children}</ul>,
          ol: ({ children }) => <ol className="mt-2 list-decimal space-y-1 pl-4">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          code: ({ children }) => (
            <code className="rounded bg-background/80 px-1 py-0.5 font-mono text-xs text-primary">
              {children}
            </code>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
