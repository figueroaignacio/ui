'use client';

import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { cn } from '../lib/cn';

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string;
  children?: React.ReactNode;
  className?: string;
}

function Accordion({ type = 'single', defaultValue, children, className }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(defaultValue ? [defaultValue] : []);

  const handleToggle = (value: string) => {
    setOpenItems((prev) =>
      type === 'single'
        ? prev.includes(value)
          ? []
          : [value]
        : prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value],
    );
  };

  return (
    <div className={cn('w-full', className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              isOpen: openItems.includes(
                (child as React.ReactElement<AccordionItemProps>).props.value,
              ),
              onToggle: () =>
                handleToggle((child as React.ReactElement<AccordionItemProps>).props.value),
            } as Partial<AccordionItemProps>)
          : child,
      )}
    </div>
  );
}

interface AccordionItemProps {
  value: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

function AccordionItem({ children, isOpen, onToggle, className }: AccordionItemProps) {
  return (
    <div className={cn('border-b', className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
              isOpen,
              onToggle,
            })
          : child,
      )}
    </div>
  );
}

interface AccordionTriggerProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

function AccordionTrigger({ children, isOpen, onToggle, className }: AccordionTriggerProps) {
  return (
    <motion.button
      onClick={onToggle}
      type="button"
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline',
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
        className="text-muted-foreground h-4 w-4 shrink-0"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{
          duration: 0.3,
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
      >
        <path d="m6 9 6 6 6-6" />
      </motion.svg>
    </motion.button>
  );
}

interface AccordionContentProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}

function AccordionContent({ children, isOpen, className }: AccordionContentProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          transition={{
            height: {
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98],
            },
            opacity: {
              duration: 0.2,
              ease: 'easeInOut',
            },
          }}
          className={cn('overflow-hidden text-sm', className)}
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            transition={{ duration: 0.2 }}
            className="pt-0 pb-4"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
