'use client';

// Components
import { CodeBlockWrapper } from './code-block-wrapper';
import { CodeBlock } from './codeblock';

interface ComponentSourceClientProps {
  code: string | null;
  expandButtonTitle?: string;
  className?: string;
  filePath?: string;
}

export function ComponentSourceClient({
  code,
  expandButtonTitle = 'Expandir',
  className = '',
  filePath,
}: ComponentSourceClientProps) {
  return (
    <div className={className}>
      {code ? (
        <CodeBlockWrapper expandButtonTitle={expandButtonTitle}>
          <CodeBlock code={code} language="tsx" showLineNumbers />
        </CodeBlockWrapper>
      ) : (
        <div className="rounded border border-red-300 p-4 text-red-500">
          Error al leer el archivo: {filePath || 'No especificado'}
        </div>
      )}
    </div>
  );
}
