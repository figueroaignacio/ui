'use server';

import { getDemoCode } from '@/features/docs/lib/get-component-code';
import { Callout } from '@repo/ui/components/callout';
import { Collapsed as AccordionCollapsed } from '../../../../../packages/ui/src/demos/accordion/collapsed';
import { Default as AccordionDefault } from '../../../../../packages/ui/src/demos/accordion/default';
import { Multiple as AccordionMultiple } from '../../../../../packages/ui/src/demos/accordion/multiple';
import { AvatarGroup as AvatarGroupDemo } from '../../../../../packages/ui/src/demos/avatar/avatar-group';
import { Default as AvatarDefault } from '../../../../../packages/ui/src/demos/avatar/default';
import { Sizes as AvatarSizes } from '../../../../../packages/ui/src/demos/avatar/sizes';
import { WithFallback as AvatarWithFallback } from '../../../../../packages/ui/src/demos/avatar/with-fallback';
import { Default as BadgeDefault } from '../../../../../packages/ui/src/demos/badge/default';
import { Destructive as BadgeDestructive } from '../../../../../packages/ui/src/demos/badge/destructive';
import { Outline as BadgeOutline } from '../../../../../packages/ui/src/demos/badge/outline';
import { Secondary as BadgeSecondary } from '../../../../../packages/ui/src/demos/badge/secondary';
import { WithIcon as BadgeWithIcon } from '../../../../../packages/ui/src/demos/badge/with-icon';
import { Collapsed as BreadcrumbCollapsed } from '../../../../../packages/ui/src/demos/breadcrumb/collapsed';
import { CustomSeparator as BreadcrumbCustomSeparator } from '../../../../../packages/ui/src/demos/breadcrumb/custom-separator';
import { Default as BreadcrumbDefault } from '../../../../../packages/ui/src/demos/breadcrumb/default';
import { Default as ButtonDefault } from '../../../../../packages/ui/src/demos/button/default';
import { Destructive as ButtonDestructive } from '../../../../../packages/ui/src/demos/button/destructive';
import { Ghost as ButtonGhost } from '../../../../../packages/ui/src/demos/button/ghost';
import { Link as ButtonLink } from '../../../../../packages/ui/src/demos/button/link';
import { Outline as ButtonOutline } from '../../../../../packages/ui/src/demos/button/outline';
import { Secondary as ButtonSecondary } from '../../../../../packages/ui/src/demos/button/secondary';
import { Sizes as ButtonSizes } from '../../../../../packages/ui/src/demos/button/sizes';
import { Danger as CalloutDanger } from '../../../../../packages/ui/src/demos/callout/danger';
import { Default as CalloutDefault } from '../../../../../packages/ui/src/demos/callout/default';
import { Info as CalloutInfo } from '../../../../../packages/ui/src/demos/callout/info';
import { Success as CalloutSuccess } from '../../../../../packages/ui/src/demos/callout/success';
import { Warning as CalloutWarning } from '../../../../../packages/ui/src/demos/callout/warning';
import { Compact as CardCompact } from '../../../../../packages/ui/src/demos/card/compact';
import { Default as CardDefault } from '../../../../../packages/ui/src/demos/card/default';
import { Ghost as CardGhost } from '../../../../../packages/ui/src/demos/card/ghost';
import { Outline as CardOutline } from '../../../../../packages/ui/src/demos/card/outline';
import { Default as CheckboxDefault } from '../../../../../packages/ui/src/demos/checkbox/default';
import { Disabled as CheckboxDisabled } from '../../../../../packages/ui/src/demos/checkbox/disabled';
import { WithLabel as CheckboxWithLabel } from '../../../../../packages/ui/src/demos/checkbox/with-label';
import { Bordered as CollapsibleBordered } from '../../../../../packages/ui/src/demos/collapsible/bordered';
import { Card as CollapsibleCard } from '../../../../../packages/ui/src/demos/collapsible/card';
import { Default as CollapsibleDefault } from '../../../../../packages/ui/src/demos/collapsible/default';
import { Alert as DialogAlert } from '../../../../../packages/ui/src/demos/dialog/alert';
import { Default as DialogDefault } from '../../../../../packages/ui/src/demos/dialog/default';
import { Checkboxes as DropdownMenuCheckboxes } from '../../../../../packages/ui/src/demos/dropdown-menu/checkboxes';
import { Default as DropdownMenuDefault } from '../../../../../packages/ui/src/demos/dropdown-menu/default';
import { RadioGroup as DropdownMenuRadioGroup } from '../../../../../packages/ui/src/demos/dropdown-menu/radio-group';
import { Default as FilesDefault } from '../../../../../packages/ui/src/demos/files/default';
import { Default as InputDefault } from '../../../../../packages/ui/src/demos/input/default';
import { Disabled as InputDisabled } from '../../../../../packages/ui/src/demos/input/disabled';
import { Sizes as InputSizes } from '../../../../../packages/ui/src/demos/input/sizes';
import { WithError as InputWithError } from '../../../../../packages/ui/src/demos/input/with-error';
import { WithIcon as InputWithIcon } from '../../../../../packages/ui/src/demos/input/with-icon';
import { WithLabel as InputWithLabel } from '../../../../../packages/ui/src/demos/input/with-label';
import { Default as LabelDefault } from '../../../../../packages/ui/src/demos/label/default';
import { Required as LabelRequired } from '../../../../../packages/ui/src/demos/label/required';
import { Default as PopoverDefault } from '../../../../../packages/ui/src/demos/popover/default';
import { Default as ProgressDefault } from '../../../../../packages/ui/src/demos/progress/default';
import { Indeterminate as ProgressIndeterminate } from '../../../../../packages/ui/src/demos/progress/indeterminate';
import { WithValue as ProgressWithValue } from '../../../../../packages/ui/src/demos/progress/with-value';
import { Default as SelectDefault } from '../../../../../packages/ui/src/demos/select/default';
import { GroupedItems as SelectGroupedItems } from '../../../../../packages/ui/src/demos/select/grouped-items';
import { Default as SeparatorDefault } from '../../../../../packages/ui/src/demos/separator/default';
import { WithLabel as SeparatorWithLabel } from '../../../../../packages/ui/src/demos/separator/with-label';
import { Default as SheetDefault } from '../../../../../packages/ui/src/demos/sheet/default';
import { Positions as SheetPositions } from '../../../../../packages/ui/src/demos/sheet/positions';
import { Sizes as SheetSizes } from '../../../../../packages/ui/src/demos/sheet/sizes';
import { Card as SkeletonCard } from '../../../../../packages/ui/src/demos/skeleton/card';
import { Default as SkeletonDefault } from '../../../../../packages/ui/src/demos/skeleton/default';
import { Default as SwitchDefault } from '../../../../../packages/ui/src/demos/switch/default';
import { Disabled as SwitchDisabled } from '../../../../../packages/ui/src/demos/switch/disabled';
import { WithLabel as SwitchWithLabel } from '../../../../../packages/ui/src/demos/switch/with-label';
import { Compact as TableCompact } from '../../../../../packages/ui/src/demos/table/compact';
import { Default as TableDefault } from '../../../../../packages/ui/src/demos/table/default';
import { Striped as TableStriped } from '../../../../../packages/ui/src/demos/table/striped';
import { WithActions as TableWithActions } from '../../../../../packages/ui/src/demos/table/with-actions';
import { Default as TabsDefault } from '../../../../../packages/ui/src/demos/tabs/default';
import { Vertical as TabsVertical } from '../../../../../packages/ui/src/demos/tabs/vertical';
import { Default as ToastDefault } from '../../../../../packages/ui/src/demos/toast/default';
import { Positions as ToastPositions } from '../../../../../packages/ui/src/demos/toast/positions';
import { Variants as ToastVariants } from '../../../../../packages/ui/src/demos/toast/variants';
import { WithAction as ToastWithAction } from '../../../../../packages/ui/src/demos/toast/with-action';
import { Default as TooltipDefault } from '../../../../../packages/ui/src/demos/tooltip/default';
import { Positions as TooltipPositions } from '../../../../../packages/ui/src/demos/tooltip/positions';
import { Default as RadioDefault } from '../../../../../packages/ui/src/demos/radio/default';
import { WithLabel as RadioWithLabel } from '../../../../../packages/ui/src/demos/radio/with-label';
import { Disabled as RadioDisabled } from '../../../../../packages/ui/src/demos/radio/disabled';
import SpinnerDefault from '../../../../../packages/ui/src/demos/spinner/default';
import SpinnerSizes from '../../../../../packages/ui/src/demos/spinner/sizes';
import SpinnerVariants from '../../../../../packages/ui/src/demos/spinner/variants';
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
  avatar: {
    default: AvatarDefault,
    sizes: AvatarSizes,
    'with-fallback': AvatarWithFallback,
    'avatar-group': AvatarGroupDemo,
  },
  badge: {
    default: BadgeDefault,
    secondary: BadgeSecondary,
    destructive: BadgeDestructive,
    outline: BadgeOutline,
    'with-icon': BadgeWithIcon,
  },
  card: {
    default: CardDefault,
    outline: CardOutline,
    ghost: CardGhost,
    compact: CardCompact,
  },
  checkbox: {
    default: CheckboxDefault,
    'with-label': CheckboxWithLabel,
    disabled: CheckboxDisabled,
  },
  radio: {
    default: RadioDefault,
    'with-label': RadioWithLabel,
    disabled: RadioDisabled,
  },
  collapsible: {
    default: CollapsibleDefault,
    bordered: CollapsibleBordered,
    card: CollapsibleCard,
  },
  callout: {
    default: CalloutDefault,
    info: CalloutInfo,
    warning: CalloutWarning,
    danger: CalloutDanger,
    success: CalloutSuccess,
  },
  breadcrumb: {
    default: BreadcrumbDefault,
    collapsed: BreadcrumbCollapsed,
    'custom-separator': BreadcrumbCustomSeparator,
  },
  dialog: {
    default: DialogDefault,
    alert: DialogAlert,
  },
  'dropdown-menu': {
    default: DropdownMenuDefault,
    checkboxes: DropdownMenuCheckboxes,
    'radio-group': DropdownMenuRadioGroup,
  },
  files: {
    default: FilesDefault,
  },
  input: {
    default: InputDefault,
    'with-label': InputWithLabel,
    'with-error': InputWithError,
    'with-icon': InputWithIcon,
    sizes: InputSizes,
    disabled: InputDisabled,
  },
  label: {
    default: LabelDefault,
    required: LabelRequired,
  },
  popover: {
    default: PopoverDefault,
  },
  progress: {
    default: ProgressDefault,
    indeterminate: ProgressIndeterminate,
    'with-value': ProgressWithValue,
  },
  select: {
    default: SelectDefault,
    'grouped-items': SelectGroupedItems,
  },
  sheet: {
    default: SheetDefault,
    positions: SheetPositions,
    sizes: SheetSizes,
  },
  separator: {
    default: SeparatorDefault,
    'with-label': SeparatorWithLabel,
  },
  skeleton: {
    default: SkeletonDefault,
    card: SkeletonCard,
  },
  switch: {
    default: SwitchDefault,
    'with-label': SwitchWithLabel,
    disabled: SwitchDisabled,
  },
  tabs: {
    default: TabsDefault,
    vertical: TabsVertical,
  },
  table: {
    default: TableDefault,
    'with-actions': TableWithActions,
    striped: TableStriped,
    compact: TableCompact,
  },
  tooltip: {
    default: TooltipDefault,
    positions: TooltipPositions,
  },
  toast: {
    default: ToastDefault,
    variants: ToastVariants,
    positions: ToastPositions,
    'with-action': ToastWithAction,
  },
  spinner: {
    default: SpinnerDefault,
    sizes: SpinnerSizes,
    variants: SpinnerVariants,
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
