'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib/cn';

const tabsListVariants = cva('inline-flex  items-center justify-center p-1 transition-colors', {
  variants: {
    variant: {
      default: 'bg-muted text-muted-foreground rounded-lg',
      outline: 'border border-border bg-transparent rounded-lg',
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
          ' data-[state=inactive]:hover:text-primary',
        ].join(' '),
        underline: [
          'rounded-none px-4 py-2 border-b-2 border-transparent',
          'data-[state=active]:border-primary data-[state=active]:text-foreground',
          'data-[state=inactive]:hover:border-muted-foreground/50 data-[state=inactive]:hover:text-foreground',
        ].join(' '),
        pills: [
          'rounded-full px-4 py-1.5',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm',
          'data-[state=inactive]:hover:bg-primary data-[state=inactive]:hover:text-primary-foreground',
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
