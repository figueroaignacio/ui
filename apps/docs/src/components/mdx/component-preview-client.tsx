'use client';

import { CodeIcon, EyeOpenIcon } from '@radix-ui/react-icons';
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
    <div className={` ${className}`}>
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="border-0">
          <TabsTrigger
            value="preview"
            className="data-[state=active]:bg-card gap-2 data-[state=active]:shadow-sm"
          >
            <EyeOpenIcon className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="data-[state=active]:bg-card gap-2 data-[state=active]:shadow-sm"
          >
            <CodeIcon className="h-4 w-4" />
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="my-6">
          <div className="border-border rounded-xl border">
            <div
              className={`flex min-h-[400px] items-center ${alignmentClasses[align]} p-8 sm:p-12`}
            >
              {componentPreview}
            </div>
            {description && (
              <div className="border-border bg-muted/30 border-t px-6 py-4">
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <div className="overflow-hidden">
            {code ? (
              <CodeBlock code={code} language="tsx" showLineNumbers />
            ) : (
              <div className="border-border bg-destructive/10 border border-t-0 p-6">
                <p className="text-destructive text-sm font-medium">
                  ⚠️ Error al leer el archivo: {filePath || 'No especificado'}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
