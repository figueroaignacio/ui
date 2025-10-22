import { Index } from '@/samples/__index__';
import fs from 'fs';
import path from 'path';
import { ComponentPreviewClient } from './component-preview-client';

interface ComponentPreviewProps {
  name: string;
  description?: string;
  className?: string;
  align?: 'center' | 'start' | 'end';
}

export async function ComponentPreview({
  name,
  description,
  className = '',
  align = 'center',
}: ComponentPreviewProps) {
  const item = Index[name as keyof typeof Index];

  if (!item) {
    return (
      <div className="rounded border border-red-300 p-4 text-red-500">
        Error: Componente "{name}" no encontrado en el index
      </div>
    );
  }

  let code: string | null = null;

  if (item.file) {
    const filePath = path.join(process.cwd(), item.file);
    try {
      code = await fs.promises.readFile(filePath, 'utf-8');
      code = code.replaceAll('@/samples/', '@/components/');
    } catch (error) {
      console.error('Error reading file:', error);
      code = null;
    }
  }

  const Component = item.component;
  const componentPreview = <Component />;

  return (
    <ComponentPreviewClient
      componentPreview={componentPreview}
      code={code}
      description={description}
      className={className}
      align={align}
      filePath={item.file}
    />
  );
}
