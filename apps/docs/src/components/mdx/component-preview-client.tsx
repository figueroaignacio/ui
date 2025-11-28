'use client';

import { CodeBlock } from './codeblock';

interface ComponentPreviewClientProps {
  componentPreview: React.ReactNode;
  code: string | null;
  description?: string;
  className?: string;
  align?: 'center' | 'start' | 'end';
  filePath?: string;
}

export function ComponentPreviewClient({
  componentPreview,
  code,
  description,
  className = '',
  align = 'center',
  filePath,
}: ComponentPreviewClientProps) {
  const alignmentClasses = {
    center: 'justify-center',
    start: 'justify-start',
    end: 'justify-end',
  };

  return (
    <div className={className}>
      <div className="border-border rounded-xl border">
        <div className={`flex min-h-[400px] items-center ${alignmentClasses[align]} p-8 sm:p-12`}>
          {componentPreview}
        </div>
        {description && (
          <div className="border-border bg-muted/30 border-t px-6 py-4">
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        )}
        <div className="border-border border-t">
          {code ? (
            <CodeBlock
              code={code}
              language="tsx"
              showLineNumbers
              className="mt-0 rounded-t-none border-none"
            />
          ) : (
            <div className="border-border bg-destructive/10 p-6">
              <p className="text-destructive text-sm font-medium">
                ⚠️ Error al leer el archivo: {filePath || 'No especificado'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
