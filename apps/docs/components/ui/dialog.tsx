'use client';

import { cn } from '@/lib/utils';
import { Cross1Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { cloneElement } from 'react';
import { createPortal } from 'react-dom';

type DialogContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext debe usarse dentro de un DialogProvider');
  }
  return context;
};

interface DialogProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: DialogProps) => {
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

  return <DialogContext.Provider value={{ open, setOpen, id }}>{children}</DialogContext.Provider>;
};

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      onClick?.(e);
    };

    if (asChild) {
      return cloneElement(props.children as React.ReactElement<any>, {
        onClick: handleClick,
      });
    }

    return <button type="button" onClick={handleClick} ref={ref} {...props} />;
  },
);
DialogTrigger.displayName = 'DialogTrigger';

interface DialogPortalProps {
  children: React.ReactNode;
}

const DialogPortal = ({ children }: DialogPortalProps) => {
  const { open } = useDialogContext();

  if (!open) return null;

  return createPortal(children, document.body);
};

interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      onClick?.(e);
    };

    if (asChild) {
      return cloneElement(props.children as React.ReactElement<any>, {
        onClick: handleClick,
      });
    }

    return <button type="button" onClick={handleClick} ref={ref} {...props} />;
  },
);
DialogClose.displayName = 'DialogClose';

interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-white/10 backdrop-blur-sm dark:bg-black/20',
          className,
        )}
        onClick={() => setOpen(false)}
        data-state="open"
        {...props}
      />
    );
  },
);
DialogOverlay.displayName = 'DialogOverlay';

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { id } = useDialogContext();

    return (
      <DialogPortal>
        <DialogOverlay />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=closed]:origin-center data-[state=open]:origin-center',
            className,
          )}
          data-state="open"
          {...props}
        >
          {children}
          <DialogClose className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <Cross1Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = 'DialogContent';

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const { id } = useDialogContext();

    return (
      <h2
        id={`${id}-title`}
        ref={ref}
        className={cn('text-lg leading-none font-semibold tracking-tight', className)}
        {...props}
      />
    );
  },
);
DialogTitle.displayName = 'DialogTitle';

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { id } = useDialogContext();

    return (
      <p
        id={`${id}-description`}
        ref={ref}
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
      />
    );
  },
);
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
