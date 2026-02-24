'use client';

import { fontCode } from '@/lib/font';
import { cn } from '@repo/ui/lib/cn';
import { Highlight, themes } from 'prism-react-renderer';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  isExpanded?: boolean;
  filename?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  showLineNumbers = false,
  isExpanded = false,
  filename,
}: CodeBlockProps) {
  const codeString = code.trim();

  return (
    <div
      className={cn(
        'group relative mt-6 w-full overflow-hidden rounded-md bg-[#2d2f31]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/5 bg-white/2 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton value={codeString} />
        </div>
      </div>
      <Highlight code={codeString} language={language} theme={themes.vsDark}>
        {({ className: _className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              'overflow-x-auto p-5 text-[13px] leading-relaxed transition-all duration-500',
              fontCode.className,
              !isExpanded ? 'max-h-[450px]' : 'max-h-none',
            )}
            style={{ ...style, backgroundColor: 'transparent' }}
          >
            {tokens.map((line, i) => {
              const { key, ...lineProps } = getLineProps({ line, key: i });
              return (
                <div key={i} {...lineProps} className={cn('table-row', lineProps.className)}>
                  {showLineNumbers && (
                    <span className="table-cell w-8 pr-4 text-right text-white/20 select-none">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
