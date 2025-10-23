'use client';

import { fontSans } from '@/lib/font';
import { cn } from '@repo/ui/lib/cn';
import { Highlight, themes } from 'prism-react-renderer';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', className }: CodeBlockProps) {
  return (
    <div className="group relative my-6">
      <div className="absolute top-4 right-4 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton value={code} />
      </div>

      <Highlight code={code.trim()} language={language} theme={themes.oneDark}>
        {({ style, tokens, getLineProps, getTokenProps }) => {
          return (
            <pre
              className={cn(
                `border-border !bg-card overflow-auto rounded-xl border p-5 text-sm leading-6 ${fontSans.className} max-h-[400px] min-h-[200px]`,
                className,
              )}
              style={{
                ...style,
                backgroundColor: 'transparent',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          );
        }}
      </Highlight>
    </div>
  );
}
