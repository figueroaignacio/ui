'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { JSX } from 'react';
import { cn } from '../lib/cn';

const tabsListVariants = cva('inline-flex items-center justify-center p-1 transition-colors', {
  variants: {
    variant: {
      default: 'bg-muted text-muted-foreground rounded-lg',
      outline: 'border border-border bg-transparent',
      underline: 'bg-transparent border-b border-border',
      pills: 'bg-transparent gap-2',
    },
    size: {
      default: 'h-10',
      sm: 'h-9',
      lg: 'h-11',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'rounded-md px-3 py-1.5',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          'data-[state=inactive]:hover:bg-background/50 data-[state=inactive]:hover:text-foreground',
        ].join(' '),
        outline: [
          'rounded-md px-3 py-1.5 border border-transparent',
          'data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-primary/5',
          'data-[state=inactive]:hover:bg-accent data-[state=inactive]:hover:text-accent-foreground',
        ].join(' '),
        underline: [
          'rounded-none px-4 py-2 border-b-2 border-transparent',
          'data-[state=active]:border-primary data-[state=active]:text-foreground',
          'data-[state=inactive]:hover:border-muted-foreground/50 data-[state=inactive]:hover:text-foreground',
        ].join(' '),
        pills: [
          'rounded-full px-4 py-1.5',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm',
          'data-[state=inactive]:hover:bg-accent data-[state=inactive]:hover:text-accent-foreground',
        ].join(' '),
      },
      size: {
        default: 'text-sm',
        sm: 'text-xs px-2 py-1',
        lg: 'text-base px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const tabsContentVariants = cva(
  'mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      animated: {
        true: 'animate-in fade-in-0 slide-in-from-bottom-1 duration-200',
        false: '',
      },
    },
    defaultVariants: {
      animated: true,
    },
  },
);

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant?: 'default' | 'outline' | 'underline' | 'pills';
  size?: 'default' | 'sm' | 'lg';
  onValueChange?: (value: string) => void;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'outline' | 'underline' | 'pills';
  size?: 'default' | 'sm' | 'lg';
}

interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsContentVariants> {
  value: string;
  forceMount?: boolean;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = (): TabsContextValue => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
};

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      defaultValue,
      value: controlledValue,
      onValueChange,
      variant = 'default',
      size = 'default',
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const activeTab = isControlled ? controlledValue : internalValue;

    const setActiveTab = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange],
    );

    const contextValue = React.useMemo<TabsContextValue>(
      () => ({
        activeTab,
        setActiveTab,
        variant,
        size,
        onValueChange,
      }),
      [activeTab, setActiveTab, variant, size, onValueChange],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={className} data-orientation="horizontal" {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const context = useTabsContext();
    const finalVariant = variant ?? context.variant;
    const finalSize = size ?? context.size;

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ variant: finalVariant, size: finalSize }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, variant, size, value, leftIcon, rightIcon, children, ...props }, ref) => {
    const context = useTabsContext();
    const finalVariant = variant ?? context.variant;
    const finalSize = size ?? context.size;
    const isActive = context.activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        id={`tab-${value}`}
        tabIndex={isActive ? 0 : -1}
        onClick={() => context.setActiveTab(value)}
        className={cn(tabsTriggerVariants({ variant: finalVariant, size: finalSize }), className)}
        {...props}
      >
        {leftIcon && <span className="mr-2 [&_svg]:size-4">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2 [&_svg]:size-4">{rightIcon}</span>}
      </button>
    );
  },
);

TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, animated, forceMount = false, children, ...props }, ref) => {
    const context = useTabsContext();
    const isActive = context.activeTab === value;

    if (!isActive && !forceMount) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        hidden={!isActive}
        className={cn(tabsContentVariants({ animated: isActive ? animated : false }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsContent.displayName = 'TabsContent';

export {
  Tabs,
  TabsContent,
  tabsContentVariants,
  TabsList,
  tabsListVariants,
  TabsTrigger,
  tabsTriggerVariants,
};

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps };

export default function TabsDemo(): JSX.Element {
  const [controlledValue, setControlledValue] = React.useState('tab1');

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Default Variant */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Default Variant</h2>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Overview</h3>
                <p className="text-muted-foreground text-sm">
                  Dashboard overview with key metrics and insights.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Analytics</h3>
                <p className="text-muted-foreground text-sm">
                  Detailed analytics and performance data.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reports">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Reports</h3>
                <p className="text-muted-foreground text-sm">
                  Generate and download comprehensive reports.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Settings</h3>
                <p className="text-muted-foreground text-sm">
                  Configure your preferences and account settings.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Outline Variant */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Outline Variant</h2>
          <Tabs defaultValue="profile" variant="outline">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Profile Settings</h3>
                <p className="text-muted-foreground text-sm">
                  Update your profile information and preferences.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Security Settings</h3>
                <p className="text-muted-foreground text-sm">
                  Manage your password and security preferences.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="notifications">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Notification Settings</h3>
                <p className="text-muted-foreground text-sm">
                  Control how and when you receive notifications.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Underline Variant */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Underline Variant</h2>
          <Tabs defaultValue="code" variant="underline">
            <TabsList>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="console">Console</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Code Editor</h3>
                <p className="text-muted-foreground text-sm">Write and edit your code here.</p>
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Live Preview</h3>
                <p className="text-muted-foreground text-sm">See your changes in real-time.</p>
              </div>
            </TabsContent>
            <TabsContent value="console">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Console Output</h3>
                <p className="text-muted-foreground text-sm">View logs and error messages.</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Pills Variant */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Pills Variant</h2>
          <Tabs defaultValue="all" variant="pills">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">All Items</h3>
                <p className="text-muted-foreground text-sm">
                  View all items regardless of status.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="active">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Active Items</h3>
                <p className="text-muted-foreground text-sm">
                  Currently active and in-progress items.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Completed Items</h3>
                <p className="text-muted-foreground text-sm">Items that have been completed.</p>
              </div>
            </TabsContent>
            <TabsContent value="archived">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">Archived Items</h3>
                <p className="text-muted-foreground text-sm">Items that have been archived.</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Diferentes Tamaños</h2>
          <div className="space-y-6">
            <Tabs defaultValue="sm" size="sm">
              <TabsList>
                <TabsTrigger value="sm">Small</TabsTrigger>
                <TabsTrigger value="sm2">Size</TabsTrigger>
              </TabsList>
              <TabsContent value="sm">
                <p className="text-muted-foreground text-sm">Small size tabs</p>
              </TabsContent>
              <TabsContent value="sm2">
                <p className="text-muted-foreground text-sm">Compact design</p>
              </TabsContent>
            </Tabs>

            <Tabs defaultValue="lg" size="lg">
              <TabsList>
                <TabsTrigger value="lg">Large</TabsTrigger>
                <TabsTrigger value="lg2">Size</TabsTrigger>
              </TabsList>
              <TabsContent value="lg">
                <p className="text-muted-foreground text-sm">Large size tabs</p>
              </TabsContent>
              <TabsContent value="lg2">
                <p className="text-muted-foreground text-sm">Spacious design</p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Controlled */}
        <section>
          <h2 className="text-foreground mb-6 text-2xl font-bold">Controlled Tabs</h2>
          <div className="mb-4">
            <p className="text-muted-foreground text-sm">
              Current value: <span className="font-mono font-semibold">{controlledValue}</span>
            </p>
          </div>
          <Tabs value={controlledValue} onValueChange={setControlledValue}>
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="border-border bg-card rounded-lg border p-6">
                <p className="text-muted-foreground text-sm">
                  This is controlled externally. Click buttons below to change tabs.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setControlledValue('tab2')}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm"
                  >
                    Go to Tab 2
                  </button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="border-border bg-card rounded-lg border p-6">
                <p className="text-muted-foreground text-sm">Second tab content</p>
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="border-border bg-card rounded-lg border p-6">
                <p className="text-muted-foreground text-sm">Third tab content</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
