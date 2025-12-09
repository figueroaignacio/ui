'use client';

import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../../lib/cn';

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
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'hover:opacity-80',
        bordered: 'p-4',
        card: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const collapsibleContentVariants = cva('overflow-hidden', {
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

interface CollapsibleContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  disabled?: boolean;
  variant?: 'default' | 'bordered' | 'card';
}

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  variant?: 'default' | 'bordered' | 'card';
}

interface CollapsibleTriggerProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  showChevron?: boolean;
  chevronIcon?: React.ReactNode;
  chevronPosition?: 'left' | 'right';
  asChild?: boolean;
  children?: React.ReactNode;
}

interface CollapsibleContentProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  forceMount?: boolean;
  children?: React.ReactNode;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

const useCollapsibleContext = (): CollapsibleContextValue => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error('Collapsible components must be used within Collapsible');
  }
  return context;
};

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

    const chevron = chevronIcon ?? <ChevronDown className="h-4 w-4 shrink-0" />;

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        'data-state': isOpen ? 'open' : 'closed',
        'aria-expanded': isOpen,
        disabled,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        data-state={isOpen ? 'open' : 'closed'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(collapsibleTriggerVariants({ variant }), className)}
        {...props}
      >
        {showChevron && chevronPosition === 'left' && (
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {chevron}
          </motion.span>
        )}
        <span className="flex-1 text-left">{children}</span>
        {showChevron && chevronPosition === 'right' && (
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {chevron}
          </motion.span>
        )}
      </motion.button>
    );
  },
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, forceMount = false, children, ...props }, ref) => {
    const { isOpen, variant } = useCollapsibleContext();

    return (
      <AnimatePresence initial={false}>
        {(isOpen || forceMount) && (
          <motion.div
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            data-state={isOpen ? 'open' : 'closed'}
            className={cn(collapsibleContentVariants({ variant }), className)}
            {...props}
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

CollapsibleContent.displayName = 'CollapsibleContent';

export {
  Collapsible,
  CollapsibleContent,
  collapsibleContentVariants,
  CollapsibleTrigger,
  collapsibleTriggerVariants,
  collapsibleVariants,
};

export type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerProps };
