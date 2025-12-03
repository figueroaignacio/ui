// Components
import { ComponentSourceClient } from './component-source-client';

// Utils
import { getComponentCode } from '@/features/docs/lib/get-component-code';

interface ComponentSourceProps {
  name: string;
  expandButtonTitle?: string;
  className?: string;
}

export async function ComponentSource({
  name,
  expandButtonTitle = 'View Source',
  className,
}: ComponentSourceProps) {
  const { item, code, error } = await getComponentCode(name);

  if (error || !item) {
    return (
      <div className="rounded border border-red-300 p-4 text-red-500">
        {error ?? `Error: Componente "${name}" no encontrado.`}
      </div>
    );
  }

  return (
    <ComponentSourceClient
      code={code}
      expandButtonTitle={expandButtonTitle}
      className={className}
      filePath={item.file}
    />
  );
}
