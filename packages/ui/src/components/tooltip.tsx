'use client';

import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import * as React from 'react';
import { cn } from '../lib/cn';

interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  delayDuration: number;
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);

const useTooltip = () => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
};

interface TooltipProps {
  children: React.ReactNode;
  delayDuration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({
  children,
  delayDuration = 200,
  open: controlledOpen,
  onOpenChange,
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = React.useCallback(
    (newState: boolean) => {
      if (isControlled) {
        onOpenChange?.(newState);
      } else {
        setInternalOpen(newState);
      }
    },
    [isControlled, onOpenChange],
  );

  return (
    <TooltipContext.Provider value={{ open, setOpen, delayDuration }}>
      <div className="relative flex h-fit w-fit items-center justify-center">{children}</div>
    </TooltipContext.Provider>
  );
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function TooltipTrigger({
  children,
  asChild = false,
  className,
  ...props
}: TooltipTriggerProps) {
  const { setOpen, delayDuration } = useTooltip();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, delayDuration);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;

    return React.cloneElement(child, {
      ...props,
      onMouseEnter: (e: React.MouseEvent) => {
        handleMouseEnter();
        child.props.onMouseEnter?.(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        handleMouseLeave();
        child.props.onMouseLeave?.(e);
      },
      className: cn(className, child.props.className),
    });
  }

  return (
    <div
      className={cn('cursor-pointer', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

interface TooltipContentProps extends HTMLMotionProps<'div'> {
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  children?: React.ReactNode;
}

export function TooltipContent({
  side = 'top',
  sideOffset = 4,
  className,
  children,
  ...props
}: TooltipContentProps) {
  const { open } = useTooltip();

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const animationVariants = {
    top: { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 } },
    bottom: { initial: { opacity: 0, y: -5 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 5 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -5 }, animate: { opacity: 1, x: 0 } },
  };

  const arrowPosition = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b-0 border-r-0',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-t-0 border-l-0',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-0 border-b-0',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-0 border-t-0',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={animationVariants[side].initial}
          animate={animationVariants[side].animate}
          exit={animationVariants[side].initial}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            ...(side === 'top' && { marginBottom: sideOffset }),
            ...(side === 'bottom' && { marginTop: sideOffset }),
            ...(side === 'left' && { marginRight: sideOffset }),
            ...(side === 'right' && { marginLeft: sideOffset }),
          }}
          className={cn(
            'bg-foreground text-background absolute z-50 rounded-xl px-3 py-1.5 text-xs whitespace-nowrap shadow-md',
            positionClasses[side],
            className,
          )}
          {...props}
        >
          {children}
          <div className={cn('bg-foreground absolute h-2 w-2 rotate-45', arrowPosition[side])} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const TooltipProvider = Tooltip;
