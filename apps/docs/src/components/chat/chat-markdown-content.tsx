import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../mdx/codeblock';

interface MarkdownContentProps {
  content: string;
}

export function ChatMarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-foreground mt-6 mb-4 text-2xl font-bold tracking-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-foreground mt-5 mb-3 text-xl font-semibold tracking-tight">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-foreground mt-4 mb-2 text-lg font-semibold tracking-tight">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-foreground mt-3 mb-2 text-base font-medium">{children}</h4>
        ),

        p: ({ children }) => (
          <p className="text-foreground mb-4 leading-relaxed not-first:mt-4">{children}</p>
        ),

        ul: ({ children }) => (
          <ul className="text-foreground my-4 ml-6 list-disc space-y-2 [&>li]:pl-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="text-foreground my-4 ml-6 list-decimal space-y-2 [&>li]:pl-1">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-foreground leading-relaxed [&>p]:my-1">{children}</li>
        ),

        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline-offset-4 transition-colors hover:underline hover:opacity-80"
          >
            {children}
          </a>
        ),

        blockquote: ({ children }) => (
          <blockquote className="border-primary/50 bg-muted/30 my-4 rounded-r-lg border-l-4 py-2 pr-3 pl-4 italic">
            <div className="text-muted-foreground [&>p]:my-1">{children}</div>
          </blockquote>
        ),

        hr: () => <hr className="border-border my-6" />,

        strong: ({ children }) => (
          <strong className="text-foreground font-semibold">{children}</strong>
        ),

        em: ({ children }) => <em className="text-foreground/90 italic">{children}</em>,

        table: ({ children }) => (
          <div className="my-4 w-full overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
        tbody: ({ children }) => <tbody className="divide-y">{children}</tbody>,
        tr: ({ children }) => (
          <tr className="hover:bg-muted/30 border-b transition-colors">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="text-foreground px-4 py-2 text-left font-semibold">{children}</th>
        ),
        td: ({ children }) => <td className="text-foreground px-4 py-2">{children}</td>,

        code: ({
          inline,
          className,
          children,
          ...props
        }: ComponentProps<'code'> & { inline?: boolean }) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : 'text';
          const codeString = String(children).replace(/\n$/, '');

          return !inline ? (
            <CodeBlock
              code={codeString}
              language={language}
              showLineNumbers={codeString.split('\n').length > 10}
            />
          ) : (
            <code
              className="bg-muted text-foreground rounded-md px-1.5 py-0.5 font-mono text-[0.875em] font-medium"
              {...props}
            >
              {children}
            </code>
          );
        },

        pre: ({ children }) => <div className="not-prose my-4">{children}</div>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
