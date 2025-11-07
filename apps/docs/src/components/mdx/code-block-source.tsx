'use client';

import { CodeBlockWrapper } from './code-block-wrapper';
import { CodeBlock } from './codeblock';

interface CodeBlockSourceProps {
  code: string;
  expandButtonTitle?: string;
  className?: string;
}

export function CodeBlockSource({ code, expandButtonTitle, className }: CodeBlockSourceProps) {
  return (
    <CodeBlockWrapper expandButtonTitle={expandButtonTitle} className={className}>
      <CodeBlock code={code} language="tsx" showLineNumbers />
    </CodeBlockWrapper>
  );
}
