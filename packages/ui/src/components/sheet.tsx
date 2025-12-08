'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/cn';
import { Button } from './button';

type SheetContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SheetContext = React.createContext<SheetContextProps | null>(null);

function useSheetContext() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error('Sheet components must be inside <Sheet>.');
  return ctx;
}

export function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setOpen } = useSheetContext();

  return <Button onClick={() => setOpen(true)}>{children}</Button>;
}

export function SheetOverlay({ className }: { className?: string }) {
  const { setOpen } = useSheetContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={cn('fixed inset-0 z-300 bg-black/50 backdrop-blur-xs', className)}
      onClick={() => setOpen(false)}
    />
  );
}

const sheetVariants = cva('fixed z-300 bg-background border shadow-xl overflow-auto', {
  variants: {
    side: {
      bottom: 'bottom-0 left-0 right-0 rounded-t-2xl',
      top: 'top-0 left-0 right-0 rounded-b-2xl',
      left: 'left-0 top-0 bottom-0 rounded-r-2xl',
      right: 'right-0 top-0 bottom-0 rounded-l-2xl',
    },
    size: {
      sm: 'w-full sm:w-1/4',
      md: 'w-full sm:w-1/2',
      lg: 'w-full sm:w-3/4',
      full: 'w-full h-full',
    },
  },
  defaultVariants: {
    side: 'bottom',
    size: 'md',
  },
});

const slideVariants = {
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
};

interface SheetContentProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>, VariantProps<typeof sheetVariants> {
  children: React.ReactNode;
  showDragHandle?: boolean;
}

export function SheetContent({
  children,
  className,
  side = 'bottom',
  size,
  showDragHandle = true,
  ...props
}: SheetContentProps) {
  const { open, setOpen } = useSheetContext();
  const [mounted, setMounted] = React.useState(false);

  const dragStart = React.useRef(0);
  const [dragY, setDragY] = React.useState(0);

  React.useEffect(() => setMounted(true), []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (side !== 'bottom' && side !== 'top') return;
    dragStart.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (side !== 'bottom' && side !== 'top') return;
    const diff = e.clientY - dragStart.current;

    if ((side === 'bottom' && diff > 0) || (side === 'top' && diff < 0)) {
      setDragY(Math.abs(diff));
    }
  };

  const handlePointerUp = () => {
    if (dragY > 100) setOpen(false);
    setDragY(0);
  };

  if (!mounted) return null;
  if (!side) return null;

  const sheet = (
    <AnimatePresence>
      {open && (
        <>
          <SheetOverlay />
          <motion.div
            initial={slideVariants[side].initial}
            animate={slideVariants[side].animate}
            exit={slideVariants[side].exit}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              y: side === 'bottom' ? dragY : side === 'top' ? -dragY : 0,
            }}
            className={cn(sheetVariants({ side, size }), className)}
            {...props}
          >
            {showDragHandle && (side === 'bottom' || side === 'top') && (
              <div
                className="flex cursor-grab justify-center pt-3 pb-2 active:cursor-grabbing"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              >
                <div className="h-1.5 w-12 rounded-full bg-gray-300" />
              </div>
            )}
            <div className="flex justify-end p-4 pb-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="hover:bg-secondary rounded-full p-2 transition"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(sheet, document.body);
}

export function SheetClose({ children }: { children: React.ReactNode }) {
  const { setOpen } = useSheetContext();

  return <div onClick={() => setOpen(false)}>{children}</div>;
}

export function SheetHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function SheetTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn('text-2xl font-semibold', className)}>{children}</h2>;
}

export function SheetDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn('text-muted-foreground mt-1 text-sm', className)}>{children}</p>;
}
