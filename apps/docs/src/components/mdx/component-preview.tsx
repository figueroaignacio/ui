'use server';

// Components
import { ComponentPreviewClient } from './component-preview-client';

// Utils
import { getComponentCode } from '@/lib/get-component-code';

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
  const { item, code, error } = await getComponentCode(name);

  if (error || !item) {
    return (
      <div className="rounded border border-red-300 p-4 text-red-500">
        {error ?? `Error: Componente "${name}" no encontrado.`}
      </div>
    );
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
