'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../lib/cn';

// --- Animation variants (hoisted at module level to avoid recreation per render) ---

const CHEVRON_VARIANTS = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
} as const;

const CHEVRON_TRANSITION = {
  type: 'spring',
  stiffness: 200,
  damping: 15,
} as const;

const CHEVRON_STYLE = { willChange: 'transform' } as const;

const CONTENT_HEIGHT_VARIANTS = {
  open: { height: 'auto' },
  closed: { height: 0 },
} as const;

const CONTENT_HEIGHT_TRANSITION = {
  duration: 0.3,
  ease: [0.04, 0.62, 0.23, 0.98] as [number, number, number, number],
} as const;

const CONTENT_FADE_VARIANTS = {
  open: { y: 0, opacity: 1, filter: 'blur(0px)' },
  closed: { y: -15, opacity: 0, filter: 'blur(6px)' },
} as const;

const CONTENT_FADE_TRANSITIONS = {
  enter: { duration: 0.35, ease: 'easeOut' },
  exit: { duration: 0.2, ease: 'easeIn' },
} as const;

const CONTENT_STYLE = { willChange: 'opacity, transform, filter' } as const;

// --- Context ---

type AccordionContextValue = {
  type: 'single' | 'multiple';
  openItems: string[];
  toggleItem: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

// --- Components ---

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string;
  children?: React.ReactNode;
  className?: string;
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = 'single', defaultValue, children, className, value, onValueChange }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
      defaultValue ? [defaultValue] : [],
    );

    const isControlled = value !== undefined;
    const openItems = isControlled ? value : uncontrolledValue;

    const toggleItem = React.useCallback(
      (itemValue: string) => {
        const updater = (prev: string[]) => {
          if (type === 'single') {
            return prev.includes(itemValue) ? [] : [itemValue];
          }
          return prev.includes(itemValue)
            ? prev.filter((v) => v !== itemValue)
            : [...prev, itemValue];
        };

        if (!isControlled) {
          setUncontrolledValue((prev) => {
            const newValue = updater(prev);
            onValueChange?.(newValue);
            return newValue;
          });
        } else {
          onValueChange?.(updater(openItems));
        }
      },
      [type, isControlled, openItems, onValueChange],
    );

    return (
      <AccordionContext.Provider value={{ type, openItems, toggleItem }}>
        <div ref={ref} className={cn('w-full space-y-2', className)}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = 'Accordion';

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: React.ReactNode;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('overflow-hidden border-b border-white/5 last:border-0', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

interface AccordionTriggerProps {
  children?: React.ReactNode;
  value: string;
  className?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, value, className }, ref) => {
    const { openItems, toggleItem } = useAccordionContext();
    const isOpen = openItems.includes(value);
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={() => toggleItem(value)}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        className={cn(
          'group flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline',
          className,
        )}
      >
        {children}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors"
          variants={CHEVRON_VARIANTS}
          animate={shouldReduceMotion ? undefined : isOpen ? 'open' : 'closed'}
          transition={CHEVRON_TRANSITION}
          style={CHEVRON_STYLE}
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </motion.button>
    );
  },
);

AccordionTrigger.displayName = 'AccordionTrigger';

interface AccordionContentProps {
  children?: React.ReactNode;
  value: string;
  className?: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, value, className }, ref) => {
    const { openItems } = useAccordionContext();
    const isOpen = openItems.includes(value);

    return (
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            ref={ref}
            key="content"
            variants={CONTENT_HEIGHT_VARIANTS}
            initial="closed"
            animate="open"
            exit="closed"
            transition={CONTENT_HEIGHT_TRANSITION}
            className={cn('overflow-hidden text-sm', className)}
          >
            <motion.div
              variants={CONTENT_FADE_VARIANTS}
              initial="closed"
              animate="open"
              exit={{ ...CONTENT_FADE_VARIANTS.closed, transition: CONTENT_FADE_TRANSITIONS.exit }}
              transition={CONTENT_FADE_TRANSITIONS.enter}
              style={CONTENT_STYLE}
              className="text-muted-foreground pt-0 pb-4"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
export type { AccordionContentProps, AccordionItemProps, AccordionProps, AccordionTriggerProps };
