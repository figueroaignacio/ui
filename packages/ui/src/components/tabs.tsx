'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'motion/react';
import * as React from 'react';
import { cn } from '../lib/cn';

const tabsListVariants = cva(
  'inline-flex   rounded-md p-1 text-muted-foreground w-full sm:w-auto overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-muted/50 border border-border/50 backdrop-blur-sm',
        outline: 'border border-border bg-transparent',
        underline: 'bg-transparent border-b border-border rounded-none p-0 justify-start w-full',
        ghost: 'bg-transparent p-0 gap-2',
      },
      size: {
        default: 'h-10',
        sm: 'h-9',
        lg: 'h-12',
      },
    },
  },
);

const tabsTriggerVariants = cva(
  [
    'relative inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-10 cursor-pointer',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'text-muted-foreground data-[state=active]:text-foreground',
        outline: 'text-muted-foreground data-[state=active]:text-foreground',
        underline:
          'text-muted-foreground hover:text-foreground data-[state=active]:text-foreground rounded-none bg-transparent px-4 pb-3 pt-2',
        ghost:
          'text-muted-foreground hover:text-foreground data-[state=active]:text-foreground hover:bg-muted/50 rounded-md',
      },
      size: {
        default: 'text-sm',
        sm: 'text-xs',
        lg: 'text-base px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  direction: number;
  setDirection: (dir: number) => void;
  variant: NonNullable<TabsProps['variant']>;
  layoutId: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used within Tabs');
  return context;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'outline' | 'underline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

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
    const [direction, setDirection] = React.useState(0);
    const layoutId = React.useId();

    const setActiveTab = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange],
    );

    return (
      <TabsContext.Provider
        value={{
          activeTab,
          setActiveTab,
          direction,
          setDirection,
          variant,
          layoutId,
        }}
      >
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const { variant: contextVariant } = useTabsContext();
    const finalVariant = variant || contextVariant;

    return (
      <div
        ref={ref}
        className={cn(tabsListVariants({ variant: finalVariant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof tabsTriggerVariants> {
  value: string;
  children: React.ReactNode;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, variant, size, ...props }, ref) => {
    const {
      activeTab,
      setActiveTab,
      setDirection,
      variant: contextVariant,
      layoutId,
    } = useTabsContext();
    const isActive = activeTab === value;
    const finalVariant = variant || contextVariant;
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const parent = buttonRef.current?.parentElement;
      if (parent) {
        const childrenArray = Array.from(parent.children);
        const newIndex = childrenArray.indexOf(buttonRef.current!);
        const currentIndex = childrenArray.findIndex(
          (child) => child.getAttribute('data-state') === 'active',
        );
        if (currentIndex !== -1 && newIndex !== currentIndex) {
          setDirection(newIndex > currentIndex ? 1 : -1);
        }
      }
      setActiveTab(value);
      props.onClick?.(e);
    };

    return (
      <button
        ref={buttonRef}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? 'active' : 'inactive'}
        onClick={handleClick}
        className={cn(tabsTriggerVariants({ variant: finalVariant, size }), className)}
        {...props}
      >
        <span className="inherit relative z-20">{children}</span>
        {isActive && (
          <motion.div
            layoutId={`${layoutId}-indicator`}
            className={cn(
              'absolute inset-0 z-10',
              finalVariant === 'underline'
                ? 'bg-primary top-auto bottom-0 h-[2px] shadow-[0_0_10px_rgba(var(--primary),0.5)]'
                : 'bg-secondary border-border/50 rounded-sm border shadow-sm',
            )}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          'ring-offset-background focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsContent, TabsList, TabsTrigger };
