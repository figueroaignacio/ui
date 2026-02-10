'use server';

import { getDemoCode } from '@/features/docs/lib/get-component-code';
import { Collapsed as AccordionCollapsed } from '../../../../../packages/ui/src/demos/accordion/collapsed';
import { Default as AccordionDefault } from '../../../../../packages/ui/src/demos/accordion/default';
import { Multiple as AccordionMultiple } from '../../../../../packages/ui/src/demos/accordion/multiple';
import { Default as BreadcrumbDefault } from '../../../../../packages/ui/src/demos/breadcrumb/default';
import { Default as ButtonDefault } from '../../../../../packages/ui/src/demos/button/default';
import { Destructive as ButtonDestructive } from '../../../../../packages/ui/src/demos/button/destructive';
import { Ghost as ButtonGhost } from '../../../../../packages/ui/src/demos/button/ghost';
import { Link as ButtonLink } from '../../../../../packages/ui/src/demos/button/link';
import { Outline as ButtonOutline } from '../../../../../packages/ui/src/demos/button/outline';
import { Secondary as ButtonSecondary } from '../../../../../packages/ui/src/demos/button/secondary';
import { Sizes as ButtonSizes } from '../../../../../packages/ui/src/demos/button/sizes';
import { Default as CalloutDefault } from '../../../../../packages/ui/src/demos/callout/default';
import { Compact as CardCompact } from '../../../../../packages/ui/src/demos/card/compact';
import { Default as CardDefault } from '../../../../../packages/ui/src/demos/card/default';
import { Ghost as CardGhost } from '../../../../../packages/ui/src/demos/card/ghost';
import { Outline as CardOutline } from '../../../../../packages/ui/src/demos/card/outline';
import { Default as CollapsibleDefault } from '../../../../../packages/ui/src/demos/collapsible/default';
import { Default as DialogDefault } from '../../../../../packages/ui/src/demos/dialog/default';
import { Default as DropdownMenuDefault } from '../../../../../packages/ui/src/demos/dropdown-menu/default';
import { Default as FilesDefault } from '../../../../../packages/ui/src/demos/files/default';
import { Default as SheetDefault } from '../../../../../packages/ui/src/demos/sheet/default';
import { Default as TabsDefault } from '../../../../../packages/ui/src/demos/tabs/default';
import { Default as TooltipDefault } from '../../../../../packages/ui/src/demos/tooltip/default';
import { ComponentPreviewClient } from './component-preview-client';

const DEMO_COMPONENTS: Record<string, Record<string, React.ComponentType>> = {
  button: {
    default: ButtonDefault,
    sizes: ButtonSizes,
    secondary: ButtonSecondary,
    destructive: ButtonDestructive,
    outline: ButtonOutline,
    ghost: ButtonGhost,
    link: ButtonLink,
  },
  accordion: {
    default: AccordionDefault,
    collapsed: AccordionCollapsed,
    multiple: AccordionMultiple,
  },
  card: {
    default: CardDefault,
    outline: CardOutline,
    ghost: CardGhost,
    compact: CardCompact,
  },
  collapsible: {
    default: CollapsibleDefault,
  },
  callout: {
    default: CalloutDefault,
  },
  breadcrumb: {
    default: BreadcrumbDefault,
  },
  dialog: {
    default: DialogDefault,
  },
  'dropdown-menu': {
    default: DropdownMenuDefault,
  },
  files: {
    default: FilesDefault,
  },
  sheet: {
    default: SheetDefault,
  },
  tabs: {
    default: TabsDefault,
  },
  tooltip: {
    default: TooltipDefault,
  },
};

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
      <div className="rounded border border-red-300 p-4 text-red-500">
        {error ?? `Error: Demo "${demo}" not found for component "${component}".`}
      </div>
    );
  }

  const DemoComponent = DEMO_COMPONENTS[component]?.[demo];

  if (!DemoComponent) {
    return (
      <div className="rounded border border-red-300 p-4 text-red-500">
        Error: Demo component not imported for "{component}/{demo}".
      </div>
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
