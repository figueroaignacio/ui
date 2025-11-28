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
          <h1 className="text-foreground mt-5 mb-3 text-lg font-bold tracking-tight">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-foreground mt-4 mb-2 text-base font-semibold tracking-tight">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-foreground mt-3 mb-1 text-sm font-semibold tracking-tight">
            {children}
          </h3>
        ),

        p: ({ children }) => <p className="text-foreground mb-3 leading-relaxed">{children}</p>,

        ul: ({ children }) => (
          <ul className="text-foreground my-3 ml-4 list-disc space-y-1.5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="text-foreground my-3 ml-4 list-decimal space-y-1.5">{children}</ol>
        ),
        li: ({ children }) => <li className="text-foreground leading-relaxed">{children}</li>,

        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            {children}
          </a>
        ),

        blockquote: ({ children }) => (
          <blockquote className="border-primary/60 text-muted-foreground my-3 border-l-4 pl-4 italic">
            {children}
          </blockquote>
        ),

        hr: () => <hr className="border-border my-5" />,

        strong: ({ children }) => (
          <strong className="text-foreground font-semibold">{children}</strong>
        ),

        em: ({ children }) => <em className="text-foreground italic">{children}</em>,

        code: ({
          inline,
          className,
          children,
          ...props
        }: ComponentProps<'code'> & { inline?: boolean }) => {
          const language = /language-(\w+)/.exec(className || '');

          return !inline ? (
            <code
              className={`border-border bg-muted/40 block w-full overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed shadow-sm`}
              {...props}
            >
              {children}
            </code>
          ) : (
            <code
              className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[11px]"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
