'use client';

import 'highlight.js/styles/github-dark.min.css';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface IPostDetailMarkdownProps {
  content: string;
}

const rehypeHighlightOptions = {
  aliases: {
    javascript: ['js', 'jsx'],
    markdown: 'md',
    typescript: ['ts', 'tsx'],
    xml: 'html',
  },
};

function isHighlightedCodeBlock(className?: string): boolean {
  return Boolean(className?.includes('hljs'));
}

export function PostDetailMarkdown({ content }: IPostDetailMarkdownProps): React.JSX.Element {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeHighlight, rehypeHighlightOptions]]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 text-2xl font-bold text-slate-900 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-8 text-xl font-bold text-slate-900 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-6 text-lg font-semibold text-slate-900 first:mt-0">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mt-4 text-base leading-relaxed text-slate-600 first:mt-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-600">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-600">
            {children}
          </blockquote>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="font-medium text-blue-600 underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ className, children, ...props }) => {
          if (isHighlightedCodeBlock(className)) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          return (
            <code
              className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children, ...props }) => (
          <pre
            className="mt-4 overflow-x-auto rounded-lg [&>code.hljs]:block [&>code.hljs]:overflow-x-auto [&>code.hljs]:rounded-lg [&>code.hljs]:p-4"
            {...props}
          >
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold text-slate-700">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-slate-200 px-3 py-2 text-slate-600">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
