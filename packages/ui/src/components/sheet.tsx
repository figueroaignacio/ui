'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib/cn';

// Context
type SheetContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SheetContext = React.createContext<SheetContextProps | undefined>(undefined);

function useSheetContext() {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error('Sheet components must be used within <Sheet>');
  return context;
}

// Root
export function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

// Trigger
export function SheetTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setOpen } = useSheetContext();
  return (
    <button onClick={() => setOpen(true)} className={cn(className)}>
      {children}
    </button>
  );
}

// Overlay
export function SheetOverlay({ className }: { className?: string }) {
  const { setOpen } = useSheetContext();
  return (
    <div
      className={cn(
        'animate-in fade-in fixed inset-0 z-50 backdrop-blur-xs duration-300',
        className,
      )}
      onClick={() => setOpen(false)}
    />
  );
}

// Variants
const sheetVariants = cva(
  'fixed z-50 bg-background border shadow-xl transition-transform overflow-auto',
  {
    variants: {
      side: {
        bottom: 'left-0 right-0 bottom-0 rounded-t-xl slide-in-from-bottom',
        top: 'left-0 right-0 top-0 rounded-b-xl slide-in-from-top',
        left: 'left-0 top-0 bottom-0 h-full rounded-r-xl slide-in-from-left',
        right: 'right-0 top-0 bottom-0 h-full rounded-l-xl slide-in-from-right',
      },
      size: {
        sm: 'h-full w-1/4',
        md: 'h-full w-1/2',
        lg: 'h-full w-3/4',
        full: 'h-full w-full',
      },
    },
    compoundVariants: [
      { side: 'top', size: 'md', class: 'h-1/2 w-full' },
      { side: 'bottom', size: 'lg', class: 'h-3/4 w-full' },
      { side: 'left', size: 'md', class: 'w-1/2 h-full' },
      { side: 'right', size: 'sm', class: 'w-1/4 h-full' },
    ],
    defaultVariants: {
      side: 'bottom',
      size: 'md',
    },
  },
);

// Content
interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> {
  children: React.ReactNode;
}

// Content
export function SheetContent({ children, className, side, size, ...props }: SheetContentProps) {
  const { open, setOpen } = useSheetContext();

  if (!open) return null;

  return (
    <>
      <SheetOverlay />
      <div
        className={cn('animate-in duration-200 ease-out', sheetVariants({ side, size }), className)}
        {...props}
      >
        <div className="flex justify-end p-2">
          <button onClick={() => setOpen(false)} className="hover:underline">
            <Cross1Icon className="size-6" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}

export function SheetClose({ children }: { children: React.ReactNode }) {
  const { setOpen } = useSheetContext();
  return (
    <div className="w-full" onClick={() => setOpen(false)}>
      {children}
    </div>
  );
}
