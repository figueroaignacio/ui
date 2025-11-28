import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export function ChatMarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-foreground mt-4 mb-2 text-base font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-foreground mt-3 mb-2 text-sm font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-foreground mt-2 mb-1 text-sm font-semibold">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-foreground mb-2 leading-relaxed last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="text-foreground mb-2 list-inside list-disc space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="text-foreground mb-2 list-inside list-decimal space-y-1">{children}</ol>
        ),
        li: ({ children }) => <li className="text-foreground">{children}</li>,
        code: ({
          inline,
          className,
          children,
          ...props
        }: ComponentProps<'code'> & { inline?: boolean }) => {
          const _match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            <code
              className={`bg-muted/50 mb-2 block overflow-x-auto rounded-lg p-3 text-xs ${className ?? ''}`}
              {...props}
            >
              {children}
            </code>
          ) : (
            <code
              className="bg-muted/80 text-foreground rounded px-1.5 py-0.5 font-mono text-xs"
              {...props}
            >
              {children}
            </code>
          );
        },
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-primary text-muted-foreground my-2 border-l-2 py-1 pl-3 italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="border-border my-3" />,
        strong: ({ children }) => (
          <strong className="text-foreground font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em className="text-foreground italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
