'use client';

import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '../lib/cn';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// ============================================================================
// CVA VARIANTS
// ============================================================================

const collapsibleVariants = cva('', {
  variants: {
    variant: {
      default: '',
      bordered: 'rounded-lg border border-border',
      card: 'rounded-lg border border-border bg-card shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const collapsibleTriggerVariants = cva(
  [
    'flex w-full items-center justify-between',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&[data-state=open]>svg]:rotate-180',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'hover:opacity-80',
        bordered: 'p-4 hover:bg-accent/50',
        card: 'p-4 hover:bg-accent/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const collapsibleContentVariants = cva('overflow-hidden transition-all duration-300', {
  variants: {
    variant: {
      default: '',
      bordered: 'px-4 pb-4',
      card: 'px-4 pb-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ============================================================================
// TYPES
// ============================================================================

interface CollapsibleContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  disabled?: boolean;
  variant?: 'default' | 'bordered' | 'card';
}

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The default open state (uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * The controlled open state
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * If true, the collapsible cannot be toggled
   */
  disabled?: boolean;
  /**
   * Visual variant
   */
  variant?: 'default' | 'bordered' | 'card';
}

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, shows a chevron icon
   */
  showChevron?: boolean;
  /**
   * Custom chevron icon
   */
  chevronIcon?: React.ReactNode;
  /**
   * Position of the chevron
   */
  chevronPosition?: 'left' | 'right';
  /**
   * Use as child to compose with custom trigger
   */
  asChild?: boolean;
}

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, content will be force mounted even when closed
   */
  forceMount?: boolean;
}

// ============================================================================
// CONTEXT
// ============================================================================

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

const useCollapsibleContext = (): CollapsibleContextValue => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error('Collapsible components must be used within Collapsible');
  }
  return context;
};

// ============================================================================
// COLLAPSIBLE COMPONENT
// ============================================================================

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      className,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      disabled = false,
      variant = 'default',
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setIsOpen = React.useCallback(
      (open: boolean) => {
        if (disabled) return;

        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [disabled, isControlled, onOpenChange],
    );

    const contextValue = React.useMemo<CollapsibleContextValue>(
      () => ({
        isOpen,
        setIsOpen,
        disabled,
        variant,
      }),
      [isOpen, setIsOpen, disabled, variant],
    );

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
          className={cn(collapsibleVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);

Collapsible.displayName = 'Collapsible';

// ============================================================================
// COLLAPSIBLE TRIGGER COMPONENT
// ============================================================================

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (
    {
      className,
      showChevron = true,
      chevronIcon,
      chevronPosition = 'right',
      asChild = false,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { isOpen, setIsOpen, disabled, variant } = useCollapsibleContext();

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
          setIsOpen(!isOpen);
          onClick?.(e);
        }
      },
      [disabled, isOpen, setIsOpen, onClick],
    );

    const chevron = chevronIcon ?? (
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        'data-state': isOpen ? 'open' : 'closed',
        'aria-expanded': isOpen,
        disabled,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        data-state={isOpen ? 'open' : 'closed'}
        aria-expanded={isOpen}
        className={cn(collapsibleTriggerVariants({ variant }), className)}
        {...props}
      >
        {showChevron && chevronPosition === 'left' && <span aria-hidden="true">{chevron}</span>}
        <span className="flex-1 text-left">{children}</span>
        {showChevron && chevronPosition === 'right' && <span aria-hidden="true">{chevron}</span>}
      </button>
    );
  },
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

// ============================================================================
// COLLAPSIBLE CONTENT COMPONENT
// ============================================================================

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, forceMount = false, children, style, ...props }, ref) => {
    const { isOpen, variant } = useCollapsibleContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number | undefined>(isOpen ? undefined : 0);

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

    React.useEffect(() => {
      const element = contentRef.current;
      if (!element) return;

      const resizeObserver = new ResizeObserver(() => {
        if (isOpen) {
          setHeight(element.scrollHeight);
        }
      });

      resizeObserver.observe(element);

      return () => resizeObserver.disconnect();
    }, [isOpen]);

    React.useEffect(() => {
      const element = contentRef.current;
      if (!element) return;

      if (isOpen) {
        setHeight(element.scrollHeight);
      } else {
        // Force reflow
        element.scrollHeight;
        setHeight(0);
      }
    }, [isOpen]);

    if (!isOpen && !forceMount) {
      return null;
    }

    return (
      <div
        ref={contentRef}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(collapsibleContentVariants({ variant }), className)}
        style={{
          height: height === undefined ? 'auto' : `${height}px`,
          ...style,
        }}
        {...props}
      >
        <div>{children}</div>
      </div>
    );
  },
);

CollapsibleContent.displayName = 'CollapsibleContent';

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Collapsible,
  CollapsibleContent,
  collapsibleContentVariants,
  CollapsibleTrigger,
  collapsibleTriggerVariants,
  collapsibleVariants,
};

export type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps };
