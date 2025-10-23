'use client';

import { cn } from '@repo/ui/lib/cn';
import { Highlight, themes } from 'prism-react-renderer';
import * as React from 'react';

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  language?: string;
  children?: React.ReactNode;
}

export function InlineCode({ className, children, language = 'tsx', ...props }: InlineCodeProps) {
  // 🧠 Función robusta para extraer texto de cualquier estructura ReactNode
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (React.isValidElement(node)) return extractText(node.props?.children);
    return '';
  };

  const content = extractText(children).trim();

  // Si por algún motivo no hay texto, renderizamos un fallback
  if (!content) {
    return (
      <code
        className={cn(
          'border-border bg-muted/60 inline-flex items-center rounded-md border px-[0.35rem] py-[0.15rem] font-mono text-[0.9rem] shadow-sm',
          className,
        )}
        {...props}
      >
        {/* Evita bloque vacío */}{' '}
      </code>
    );
  }

  return (
    <Highlight code={content} language={language} theme={themes.oneDark}>
      {({ style, tokens, getTokenProps }) => (
        <code
          className={cn(
            'border-border bg-muted/60 inline-flex items-center rounded-md border px-[0.35rem] py-[0.15rem] font-mono text-[0.9rem] shadow-sm',
            'hover:bg-muted/80 transition-colors duration-200',
            className,
          )}
          style={{ ...style, backgroundColor: 'transparent' }}
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
