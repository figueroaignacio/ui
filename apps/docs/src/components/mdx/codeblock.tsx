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
  return (
    <div
      className={cn(
        'group border-border relative mt-5 overflow-hidden rounded-xl border bg-[#090b0f]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[#181b1f] px-4 py-2.5">
        <div className="flex items-center gap-2">
          {filename && <span className="text-xs font-medium text-white">{filename}</span>}
        </div>
        <div className="flex items-center gap-2">
          <CopyButton value={code} />
        </div>
      </div>
      <Highlight code={code.trim()} language={language} theme={themes.oneDark}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              'overflow-auto p-4 text-xs leading-7 transition-all duration-300 ease-in-out',
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
                  <span className="table-cell pr-4 text-right opacity-50 select-none">{i + 1}</span>
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
