'use client';

import { cn } from '@repo/ui/lib/cn';
import { Highlight, themes } from 'prism-react-renderer';
import * as React from 'react';

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  language?: string;
  children?: React.ReactNode;
}

export function InlineCode({ className, children, language = 'tsx', ...props }: InlineCodeProps) {
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode };
      return extractText(props.children);
    }
    return '';
  };

  const content = extractText(children).trim();

  return (
    <Highlight code={content} language={language} theme={themes.oneDark}>
      {({ style, tokens, getTokenProps }) => (
        <code
          className={cn(
            'bg-muted/60 text-foreground border-border inline rounded-md border px-[.35rem] py-[.15rem] font-mono text-xs',
            className,
          )}
          style={{
            ...style,
            backgroundColor: 'transparent',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
          {...props}
        >
          {tokens[0].map((token, i) => {
            const tokenProps = getTokenProps({ token, key: i });
            return <span key={i} {...tokenProps} />;
          })}
        </code>
      )}
    </Highlight>
  );
}
