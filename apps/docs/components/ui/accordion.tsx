'use client';

import * as React from 'react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string;
  children?: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

function Accordion({ type = 'single', defaultValue, children, className, ref }: AccordionProps) {
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
    <div ref={ref} className={cn('w-full', className)}>
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
  ref?: React.RefObject<HTMLDivElement>;
}

function AccordionItem({ children, isOpen, onToggle, className, ref }: AccordionItemProps) {
  return (
    <div ref={ref} className={cn('border-b', className)}>
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
  ref?: React.RefObject<HTMLButtonElement>;
}

function AccordionTrigger({ children, isOpen, onToggle, className, ref }: AccordionTriggerProps) {
  return (
    <button
      ref={ref}
      onClick={onToggle}
      type="button"
      className={cn(
        'flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline',
        className,
      )}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          'text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

interface AccordionContentProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

function AccordionContent({ children, isOpen, className, ref }: AccordionContentProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden text-sm transition-[max-height] duration-300 ease-in-out',
        isOpen ? 'max-h-96' : 'max-h-0',
        className,
      )}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
