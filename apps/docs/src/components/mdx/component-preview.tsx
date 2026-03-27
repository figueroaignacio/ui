'use server';

import { getDemoCode } from '@/features/docs/lib/get-component-code';
import { Callout } from '@repo/ui/components/callout';
import { ComponentPreviewClient } from './component-preview-client';
import { DEMO_COMPONENTS } from './demo-registry';

interface ComponentPreviewProps {
  component: string;
  demo?: string;
  description?: string;
  className?: string;
  align?: 'center' | 'start' | 'end';
}

export async function ComponentPreview({
  component,
  demo = 'default',
  description,
  className = '',
  align = 'center',
}: ComponentPreviewProps) {
  const { code, filePath, error } = await getDemoCode(component, demo);

  if (error) {
    return (
      <Callout variant="danger" className="my-4">
        {error ?? `Error: Demo "${demo}" not found for component "${component}".`}
      </Callout>
    );
  }

  const DemoComponent = DEMO_COMPONENTS[component]?.[demo];

  if (!DemoComponent) {
    return (
      <Callout variant="danger" className="my-4">
        Error: Demo component not imported for &quot;{component}/{demo}&quot;.
      </Callout>
    );
  }

  const componentPreview = <DemoComponent />;

  return (
    <ComponentPreviewClient
      componentPreview={componentPreview}
      code={code}
      description={description}
      className={className}
      align={align}
      filePath={filePath || undefined}
    />
  );
}
