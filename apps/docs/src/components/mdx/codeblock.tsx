'use client';

import { fontSans } from '@/lib/font';
import { cn } from '@repo/ui/lib/cn';
import { Highlight, themes } from 'prism-react-renderer';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  return (
    <div className="group border-border bg-card relative my-6 overflow-hidden rounded-xl border">
      <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
        </div>
        <CopyButton value={code} />
      </div>
      <Highlight code={code.trim()} language={language} theme={themes.oneDark}>
        {({ style, tokens, getLineProps, getTokenProps }) => {
          return (
            <pre
              className={cn(
                'overflow-auto p-4 text-sm leading-relaxed',
                fontSans.className,
                'max-h-[500px]',
                className,
              )}
              style={{
                ...style,
                backgroundColor: 'transparent',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  {showLineNumbers && (
                    <span className="text-muted-foreground/50 table-cell pr-4 text-right tabular-nums select-none">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          );
        }}
      </Highlight>
    </div>
  );
}
