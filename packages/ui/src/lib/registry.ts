export const COMPONENT_REGISTRY = {
  button: 'packages/ui/src/components/button.tsx',
  accordion: 'packages/ui/src/components/accordion.tsx',
  avatar: 'packages/ui/src/components/avatar.tsx',
  badge: 'packages/ui/src/components/badge.tsx',
  card: 'packages/ui/src/components/card.tsx',
  checkbox: 'packages/ui/src/components/checkbox.tsx',
  collapsible: 'packages/ui/src/components/collapsible.tsx',
  callout: 'packages/ui/src/components/callout.tsx',
  breadcrumb: 'packages/ui/src/components/breadcrumb.tsx',
  dialog: 'packages/ui/src/components/dialog.tsx',
  'dropdown-menu': 'packages/ui/src/components/dropdown-menu.tsx',
  files: 'packages/ui/src/components/files.tsx',
  input: 'packages/ui/src/components/input.tsx',
  label: 'packages/ui/src/components/label.tsx',
  popover: 'packages/ui/src/components/popover.tsx',
  progress: 'packages/ui/src/components/progress.tsx',
  select: 'packages/ui/src/components/select.tsx',
  separator: 'packages/ui/src/components/separator.tsx',
  sheet: 'packages/ui/src/components/sheet.tsx',
  skeleton: 'packages/ui/src/components/skeleton.tsx',
  switch: 'packages/ui/src/components/switch.tsx',
  tabs: 'packages/ui/src/components/tabs.tsx',
  table: 'packages/ui/src/components/table.tsx',
  textarea: 'packages/ui/src/components/textarea.tsx',
  toast: 'packages/ui/src/components/toast.tsx',
  tooltip: 'packages/ui/src/components/tooltip.tsx',
} as const;

export const DEMO_REGISTRY = {
  // Button demos
  button: {
    default: 'packages/ui/src/demos/button/default.tsx',
    sizes: 'packages/ui/src/demos/button/sizes.tsx',
    secondary: 'packages/ui/src/demos/button/secondary.tsx',
    destructive: 'packages/ui/src/demos/button/destructive.tsx',
    outline: 'packages/ui/src/demos/button/outline.tsx',
    ghost: 'packages/ui/src/demos/button/ghost.tsx',
    link: 'packages/ui/src/demos/button/link.tsx',
  },
  // Accordion demos
  accordion: {
    default: 'packages/ui/src/demos/accordion/default.tsx',
    collapsed: 'packages/ui/src/demos/accordion/collapsed.tsx',
    multiple: 'packages/ui/src/demos/accordion/multiple.tsx',
  },
  // Card demos
  card: {
    default: 'packages/ui/src/demos/card/default.tsx',
    outline: 'packages/ui/src/demos/card/outline.tsx',
    ghost: 'packages/ui/src/demos/card/ghost.tsx',
    compact: 'packages/ui/src/demos/card/compact.tsx',
  },
  // Collapsible demos
  collapsible: {
    default: 'packages/ui/src/demos/collapsible/default.tsx',
    bordered: 'packages/ui/src/demos/collapsible/bordered.tsx',
    card: 'packages/ui/src/demos/collapsible/card.tsx',
  },
  // Callout demos
  callout: {
    default: 'packages/ui/src/demos/callout/default.tsx',
    info: 'packages/ui/src/demos/callout/info.tsx',
    warning: 'packages/ui/src/demos/callout/warning.tsx',
    danger: 'packages/ui/src/demos/callout/danger.tsx',
    success: 'packages/ui/src/demos/callout/success.tsx',
  },
  // Avatar demos
  avatar: {
    default: 'packages/ui/src/demos/avatar/default.tsx',
    sizes: 'packages/ui/src/demos/avatar/sizes.tsx',
    'with-fallback': 'packages/ui/src/demos/avatar/with-fallback.tsx',
    'avatar-group': 'packages/ui/src/demos/avatar/avatar-group.tsx',
  },
  // Badge demos
  badge: {
    default: 'packages/ui/src/demos/badge/default.tsx',
    secondary: 'packages/ui/src/demos/badge/secondary.tsx',
    destructive: 'packages/ui/src/demos/badge/destructive.tsx',
    outline: 'packages/ui/src/demos/badge/outline.tsx',
    'with-icon': 'packages/ui/src/demos/badge/with-icon.tsx',
  },
  // Breadcrumb demos
  breadcrumb: {
    default: 'packages/ui/src/demos/breadcrumb/default.tsx',
    collapsed: 'packages/ui/src/demos/breadcrumb/collapsed.tsx',
    'custom-separator': 'packages/ui/src/demos/breadcrumb/custom-separator.tsx',
  },
  // Checkbox demos
  checkbox: {
    default: 'packages/ui/src/demos/checkbox/default.tsx',
    'with-label': 'packages/ui/src/demos/checkbox/with-label.tsx',
    disabled: 'packages/ui/src/demos/checkbox/disabled.tsx',
  },
  // Dialog demos
  dialog: {
    default: 'packages/ui/src/demos/dialog/default.tsx',
    alert: 'packages/ui/src/demos/dialog/alert.tsx',
  },
  // Dropdown Menu demos
  'dropdown-menu': {
    default: 'packages/ui/src/demos/dropdown-menu/default.tsx',
    checkboxes: 'packages/ui/src/demos/dropdown-menu/checkboxes.tsx',
    'radio-group': 'packages/ui/src/demos/dropdown-menu/radio-group.tsx',
  },
  // Files demos
  files: {
    default: 'packages/ui/src/demos/files/default.tsx',
  },
  // Input demos
  input: {
    default: 'packages/ui/src/demos/input/default.tsx',
    'with-label': 'packages/ui/src/demos/input/with-label.tsx',
    'with-error': 'packages/ui/src/demos/input/with-error.tsx',
    'with-icon': 'packages/ui/src/demos/input/with-icon.tsx',
    sizes: 'packages/ui/src/demos/input/sizes.tsx',
    disabled: 'packages/ui/src/demos/input/disabled.tsx',
  },
  // Label demos
  label: {
    default: 'packages/ui/src/demos/label/default.tsx',
    required: 'packages/ui/src/demos/label/required.tsx',
  },
  // Popover demos
  popover: {
    default: 'packages/ui/src/demos/popover/default.tsx',
  },
  // Progress demos
  progress: {
    default: 'packages/ui/src/demos/progress/default.tsx',
    indeterminate: 'packages/ui/src/demos/progress/indeterminate.tsx',
    'with-value': 'packages/ui/src/demos/progress/with-value.tsx',
  },
  // Select demos
  select: {
    default: 'packages/ui/src/demos/select/default.tsx',
    'grouped-items': 'packages/ui/src/demos/select/grouped-items.tsx',
  },
  // Sheet demos
  sheet: {
    default: 'packages/ui/src/demos/sheet/default.tsx',
    positions: 'packages/ui/src/demos/sheet/positions.tsx',
    sizes: 'packages/ui/src/demos/sheet/sizes.tsx',
  },
  // Separator demos
  separator: {
    default: 'packages/ui/src/demos/separator/default.tsx',
    'with-label': 'packages/ui/src/demos/separator/with-label.tsx',
  },
  // Skeleton demos
  skeleton: {
    default: 'packages/ui/src/demos/skeleton/default.tsx',
    card: 'packages/ui/src/demos/skeleton/card.tsx',
  },
  // Tabs demos
  tabs: {
    default: 'packages/ui/src/demos/tabs/default.tsx',
    vertical: 'packages/ui/src/demos/tabs/vertical.tsx',
  },
  // Switch demos
  switch: {
    default: 'packages/ui/src/demos/switch/default.tsx',
    'with-label': 'packages/ui/src/demos/switch/with-label.tsx',
    disabled: 'packages/ui/src/demos/switch/disabled.tsx',
  },
  // Table demos
  table: {
    default: 'packages/ui/src/demos/table/default.tsx',
    'with-actions': 'packages/ui/src/demos/table/with-actions.tsx',
    striped: 'packages/ui/src/demos/table/striped.tsx',
    compact: 'packages/ui/src/demos/table/compact.tsx',
  },
  // Tooltip demos
  tooltip: {
    default: 'packages/ui/src/demos/tooltip/default.tsx',
    positions: 'packages/ui/src/demos/tooltip/positions.tsx',
  },
  // Textarea demos
  textarea: {
    default: 'packages/ui/src/demos/textarea/default.tsx',
    'with-label': 'packages/ui/src/demos/textarea/with-label.tsx',
    'auto-resize': 'packages/ui/src/demos/textarea/auto-resize.tsx',
    disabled: 'packages/ui/src/demos/textarea/disabled.tsx',
  },
  // Toast demos
  toast: {
    default: 'packages/ui/src/demos/toast/default.tsx',
    variants: 'packages/ui/src/demos/toast/variants.tsx',
    positions: 'packages/ui/src/demos/toast/positions.tsx',
    'with-action': 'packages/ui/src/demos/toast/with-action.tsx',
  },
} as const;

export type ComponentName = keyof typeof COMPONENT_REGISTRY;
export type DemoName<T extends keyof typeof DEMO_REGISTRY> = keyof (typeof DEMO_REGISTRY)[T];
