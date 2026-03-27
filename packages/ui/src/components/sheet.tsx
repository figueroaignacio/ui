'use client';

import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, HTMLMotionProps, motion, useMotionValue } from 'motion/react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/cn';
import { Button, ButtonProps } from './button';

// --- Animation constants (module level) ---

const slideVariants = {
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '110%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-110%' },
  },
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-110%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '110%' },
  },
} as const;

const SHEET_SPRING = { type: 'spring', damping: 32, stiffness: 320 } as const;

const SHEET_OVERLAY_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const SHEET_OVERLAY_TRANSITION = { duration: 0.2 } as const;
const SHEET_OVERLAY_STYLE = { willChange: 'opacity' } as const;
const SHEET_CONTENT_STYLE = { willChange: 'transform' } as const;
const CLOSE_BUTTON_TAP = { scale: 0.9 } as const;
const SWIPE_CLOSE_THRESHOLD = 80;

// --- Context ---

type SheetContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const SheetContext = React.createContext<SheetContextProps | null>(null);

function useSheetContext() {
  const ctx = React.use(SheetContext);
  if (!ctx) throw new Error('Sheet components must be inside <Sheet>.');
  return ctx;
}

// --- Components ---

interface SheetProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SheetRoot = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: SheetProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const id = React.useId();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }

      if (onOpenChange) {
        const newValue = typeof value === 'function' ? value(open) : value;
        onOpenChange(newValue);
      }
    },
    [isControlled, onOpenChange, open],
  );

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return <SheetContext value={{ open, setOpen, id }}>{children}</SheetContext>;
};

const SheetTrigger = ({
  children,
  className,
  variant,
  size,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  icon?: boolean;
}) => {
  const { setOpen } = useSheetContext();

  return (
    <Button className={cn(className)} onClick={() => setOpen(true)} variant={variant} size={size}>
      {children}
    </Button>
  );
};

const SheetOverlay = ({ className }: { className?: string }) => {
  const { setOpen } = useSheetContext();

  return (
    <motion.div
      variants={SHEET_OVERLAY_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={SHEET_OVERLAY_TRANSITION}
      style={SHEET_OVERLAY_STYLE}
      className={cn('fixed inset-0 z-300 bg-black/50 backdrop-blur-xs', className)}
      onClick={() => setOpen(false)}
    />
  );
};

// --- CVA ---

const sheetVariants = cva('fixed z-300 bg-background border shadow-2xl overflow-auto rounded-2xl', {
  variants: {
    side: {
      bottom: 'bottom-3 left-3 right-3',
      top: 'top-3 left-3 right-3',
      left: 'left-3 top-3 bottom-3',
      right: 'right-3 top-3 bottom-3',
    },
    size: {
      sm: 'sm:left-auto sm:w-80',
      md: 'sm:left-auto sm:w-96',
      lg: 'sm:left-auto sm:w-[28rem]',
      full: 'w-full h-full !rounded-none !inset-0',
    },
  },
  defaultVariants: {
    side: 'bottom',
    size: 'md',
  },
});

interface SheetContentProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>, VariantProps<typeof sheetVariants> {
  children: React.ReactNode;
  showDragHandle?: boolean;
}

const SheetContent = ({
  children,
  className,
  side = 'bottom',
  size,
  showDragHandle = true,
  ...props
}: SheetContentProps) => {
  const { open, setOpen, id } = useSheetContext();
  const [mounted, setMounted] = React.useState(false);

  const dragY = useMotionValue(0);
  const dragX = useMotionValue(0);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  const isVertical = side === 'bottom' || side === 'top';
  const isHorizontal = side === 'left' || side === 'right';

  const dragAxis = isVertical ? 'y' : 'x';

  const dragConstraints = React.useMemo(() => {
    if (side === 'bottom') return { top: 0, bottom: 0 };
    if (side === 'top') return { top: 0, bottom: 0 };
    if (side === 'left') return { left: 0, right: 0 };
    if (side === 'right') return { left: 0, right: 0 };
    return {};
  }, [side]);

  const dragElastic = 0.15;

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const { x, y } = info.offset;

    const shouldClose =
      (side === 'bottom' && y > SWIPE_CLOSE_THRESHOLD) ||
      (side === 'top' && -y > SWIPE_CLOSE_THRESHOLD) ||
      (side === 'right' && x > SWIPE_CLOSE_THRESHOLD) ||
      (side === 'left' && -x > SWIPE_CLOSE_THRESHOLD);

    if (shouldClose) {
      setOpen(false);
    } else {
      // Snap back
      if (isVertical) dragY.set(0);
      if (isHorizontal) dragX.set(0);
    }
  };

  if (!mounted) return null;
  if (!side) return null;

  const sheet = (
    <AnimatePresence>
      {open && (
        <>
          <SheetOverlay className="z-300" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
            drag={dragAxis}
            dragMomentum={false}
            dragElastic={dragElastic}
            dragConstraints={dragConstraints}
            onDragEnd={handleDragEnd}
            style={{
              ...(isVertical ? { y: dragY } : { x: dragX }),
              ...SHEET_CONTENT_STYLE,
            }}
            initial={slideVariants[side].initial}
            animate={slideVariants[side].animate}
            exit={slideVariants[side].exit}
            transition={SHEET_SPRING}
            className={cn(sheetVariants({ side, size }), className)}
            {...props}
          >
            {showDragHandle && (
              <div className="flex shrink-0 items-center justify-center py-2.5">
                <div className="bg-muted-foreground/30 h-1 w-10 cursor-grab rounded-full active:cursor-grabbing" />
              </div>
            )}

            {/* Close button */}
            <div className="flex justify-end px-4 pt-2 pb-0">
              <motion.button
                whileTap={CLOSE_BUTTON_TAP}
                onClick={() => setOpen(false)}
                className="hover:bg-muted rounded-full p-2 transition-colors"
                aria-label="Close"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" size={16} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="px-5 pt-2 pb-5">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(sheet, document.body);
};

const SheetClose = ({ children }: { children: React.ReactNode }) => {
  const { setOpen } = useSheetContext();

  return (
    <button type="button" onClick={() => setOpen(false)}>
      {children}
    </button>
  );
};

const SheetHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('mb-4', className)}>{children}</div>;
};

const SheetTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { id } = useSheetContext();
  return (
    <h2 id={`${id}-title`} className={cn('text-xl font-semibold tracking-tight', className)}>
      {children}
    </h2>
  );
};

const SheetDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { id } = useSheetContext();
  return (
    <p id={`${id}-description`} className={cn('text-muted-foreground mt-1 text-sm', className)}>
      {children}
    </p>
  );
};

const Sheet = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Close: SheetClose,
});

export { Sheet };
