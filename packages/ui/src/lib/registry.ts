export const COMPONENT_REGISTRY = {
  button: 'packages/ui/src/components/button.tsx',
  accordion: 'packages/ui/src/components/accordion.tsx',
  card: 'packages/ui/src/components/card.tsx',
  collapsible: 'packages/ui/src/components/collapsible.tsx',
  callout: 'packages/ui/src/components/callout.tsx',
  breadcrumb: 'packages/ui/src/components/breadcrumb.tsx',
  dialog: 'packages/ui/src/components/dialog.tsx',
  'dropdown-menu': 'packages/ui/src/components/dropdown-menu.tsx',
  files: 'packages/ui/src/components/files.tsx',
  sheet: 'packages/ui/src/components/sheet.tsx',
  tabs: 'packages/ui/src/components/tabs.tsx',
  table: 'packages/ui/src/components/table.tsx',
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
  // Breadcrumb demos
  breadcrumb: {
    default: 'packages/ui/src/demos/breadcrumb/default.tsx',
    collapsed: 'packages/ui/src/demos/breadcrumb/collapsed.tsx',
    'custom-separator': 'packages/ui/src/demos/breadcrumb/custom-separator.tsx',
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
  // Sheet demos
  sheet: {
    default: 'packages/ui/src/demos/sheet/default.tsx',
    positions: 'packages/ui/src/demos/sheet/positions.tsx',
    sizes: 'packages/ui/src/demos/sheet/sizes.tsx',
  },
  // Tabs demos
  tabs: {
    default: 'packages/ui/src/demos/tabs/default.tsx',
    vertical: 'packages/ui/src/demos/tabs/vertical.tsx',
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
} as const;

export type ComponentName = keyof typeof COMPONENT_REGISTRY;
export type DemoName<T extends keyof typeof DEMO_REGISTRY> = keyof (typeof DEMO_REGISTRY)[T];
