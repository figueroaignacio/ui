import { InlineCode } from '@/components/mdx/inline-code';
import { Pre } from '@/components/mdx/typography';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export function ChatMarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="max-w-full overflow-x-hidden">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-foreground wrap-break-words mt-6 mb-4 text-2xl font-bold tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-foreground wrap-break-words mt-5 mb-3 text-xl font-semibold tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-foreground wrap-break-words mt-4 mb-2 text-lg font-semibold tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-foreground wrap-break-words mt-3 mb-2 text-base font-medium">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-foreground wrap-break-words mb-4 leading-relaxed not-first:mt-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="text-foreground wrap-break-words my-4 ml-6 list-disc space-y-2 [&>li]:pl-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="text-foreground wrap-break-words my-4 ml-6 list-decimal space-y-2 [&>li]:pl-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-foreground wrap-break-words leading-relaxed [&>p]:my-1">
              {children}
            </li>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary wrap-break-words font-medium underline-offset-4 transition-colors hover:underline hover:opacity-80"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-primary/50 bg-muted/30 my-4 rounded-r-lg border-l-4 py-2 pr-3 pl-4 italic">
              <div className="text-muted-foreground wrap-break-words [&>p]:my-1">{children}</div>
            </blockquote>
          ),
          hr: () => <hr className="border-border my-6" />,
          strong: ({ children }) => (
            <strong className="text-foreground wrap-break-words font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-foreground/90 wrap-break-words italic">{children}</em>
          ),
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
            <th className="text-foreground wrap-break-words px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="text-foreground wrap-break-words px-4 py-2">{children}</td>
          ),
          pre: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-lg">
              <Pre>{children}</Pre>
            </div>
          ),
          code: ({ children }) => <InlineCode>{children}</InlineCode>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
