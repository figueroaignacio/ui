'use client';

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/tabs';
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
    <Tabs defaultValue="preview" className={`my-6 ${className}`}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div
          className={`flex min-h-[350px] items-center ${alignmentClasses[align]} rounded-md border p-8`}
        >
          {componentPreview}
        </div>
        {description && <p className="text-muted-foreground mt-2 text-sm">{description}</p>}
      </TabsContent>

      <TabsContent value="code">
        {code ? (
          <CodeBlock code={code} language="tsx" />
        ) : (
          <div className="p-4 text-red-500">
            Error al leer el archivo: {filePath || 'No especificado'}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
