import { InlineCode } from '@/components/mdx/inline-code';
import { Pre } from '@/components/mdx/typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function ChatMarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="max-w-full overflow-x-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-foreground wrap-break-words mt-8 mb-4 text-3xl font-bold tracking-tight first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-foreground wrap-break-words mt-8 mb-4 text-2xl font-semibold tracking-tight first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-foreground wrap-break-words mt-6 mb-3 text-xl font-semibold tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-foreground wrap-break-words mt-4 mb-2 text-lg font-semibold tracking-tight">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-foreground wrap-break-words mb-4 leading-7 not-first:mt-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="text-foreground wrap-break-words my-6 ml-6 list-disc space-y-2 [&>li]:pl-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="text-foreground wrap-break-words my-6 ml-6 list-decimal space-y-2 [&>li]:pl-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-foreground wrap-break-words leading-7 [&>p]:my-1">{children}</li>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary wrap-break-words hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-primary/30 bg-muted/40 text-muted-foreground my-6 border-l-4 pl-6 italic [&>p]:my-1">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-border my-8" />,
          strong: ({ children }) => (
            <strong className="text-foreground wrap-break-words font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-foreground/90 wrap-break-words italic">{children}</em>
          ),
          table: ({ children }) => (
            <div className="my-6 w-full overflow-y-auto rounded-md border shadow-sm">
              <Table>{children}</Table>
            </div>
          ),
          thead: ({ children }) => <TableHeader>{children}</TableHeader>,
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          tr: ({ children }) => <TableRow className="hover:bg-muted/50">{children}</TableRow>,
          th: ({ children }) => (
            <TableHead className="text-foreground px-4 py-3 text-left font-bold">
              {children}
            </TableHead>
          ),
          td: ({ children }) => (
            <TableCell className="px-4 py-3 align-top leading-6">{children}</TableCell>
          ),
          pre: ({ children }) => <Pre>{children}</Pre>,
          code: ({ children }) => <InlineCode>{children}</InlineCode>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
