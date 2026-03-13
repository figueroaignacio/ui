'use client';

import { fontCode } from '@/lib/font';
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/cn';
import { useTranslations } from 'next-intl';
import { Highlight, themes } from 'prism-react-renderer';
import { useEffect, useRef, useState } from 'react';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  isExpanded?: boolean;
  filename?: string;
  expandButton?: React.ReactNode;
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  showLineNumbers = false,
  isExpanded: initialIsExpanded = false,
  filename,
  expandButton,
}: CodeBlockProps) {
  const codeString = code.trim();
  const preRef = useRef<HTMLPreElement>(null);
  const [internalIsExpanded, setInternalIsExpanded] = useState(initialIsExpanded);
  const [isExpandable, setIsExpandable] = useState(false);
  const t = useTranslations('components.codeblockWrapper');

  useEffect(() => {
    setInternalIsExpanded(initialIsExpanded);
  }, [initialIsExpanded]);

  useEffect(() => {
    if (preRef.current) {
      const scrollHeight = preRef.current.scrollHeight;
      if (scrollHeight > 450) {
        setIsExpandable(true);
      } else {
        setIsExpandable(false);
      }
    }
  }, [codeString]);

  return (
    <div
      className={cn(
        'group relative mt-6 w-full overflow-hidden rounded-md bg-[#1e1f20] transition-all duration-500',
        !internalIsExpanded ? 'max-h-[450px]' : 'max-h-none',
        className,
      )}
    >
      <div className="max-h-inherit flex h-full flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#1e1f20]/90 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpandable && (
              <div className="flex items-center gap-2">
                {expandButton ? (
                  expandButton
                ) : (
                  <Button
                    variant="link"
                    onClick={() => setInternalIsExpanded((prev) => !prev)}
                    className="h-auto p-0 text-xs font-normal text-white/50 hover:text-white/80"
                  >
                    {internalIsExpanded ? t('collapse') : t('expand')}
                  </Button>
                )}
                <div className="h-4 w-px bg-white/20" />
              </div>
            )}
            <CopyButton value={codeString} />
          </div>
        </div>
        <Highlight code={codeString} language={language} theme={themes.vsDark}>
          {({ className: _className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              <pre
                ref={preRef}
                className={cn(
                  'overflow-x-auto p-5 text-[13px] leading-relaxed',
                  fontCode.className,
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

              {/* Gradient shadow to indicate more code when collapsed */}
              {isExpandable && !internalIsExpanded && (
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-12 bg-linear-to-t from-[#1e1f20] to-transparent" />
              )}
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
}
