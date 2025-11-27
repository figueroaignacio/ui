'use client';

// Utils
import { fontCode } from '@/lib/font';
import { cn } from '@repo/ui/lib/cn';
import { Highlight, themes } from 'prism-react-renderer';

// Components
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  expandButton?: React.ReactNode;
  isExpanded?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  showLineNumbers = false,
  expandButton,
  isExpanded = false,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        'group border-border relative my-6 overflow-hidden rounded-xl bg-[#090b0f] transition-all duration-300 ease-in-out',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {expandButton}
          <CopyButton value={code} />
        </div>
      </div>
      <Highlight code={code.trim()} language={language} theme={themes.vsDark}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              'overflow-auto p-4 text-sm leading-relaxed transition-all duration-300 ease-in-out',
              fontCode.className,
              !isExpanded ? 'max-h-[500px]' : 'max-h-[1000px]',
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
        )}
      </Highlight>
    </div>
  );
}
