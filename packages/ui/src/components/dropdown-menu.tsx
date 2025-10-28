'use client';

import { ChevronDown } from 'lucide-react';
import React, {
  createContext,
  JSX,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../lib/cn';

interface DropdownContextValue {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  openMenu: () => void;
  triggerId: string;
  contentId: string;
}

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  asChild?: boolean;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

interface UseDropdownStateReturn {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = (): DropdownContextValue => {
  const context = use(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within DropdownMenu');
  }
  return context;
};

function useDropdownState(
  defaultOpen: boolean = false,
  onOpenChange?: (open: boolean) => void,
): UseDropdownStateReturn {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const newValue = !prev;
      onOpenChange?.(newValue);
      return newValue;
    });
  }, [onOpenChange]);

  return { isOpen, openMenu, closeMenu, toggleMenu };
}

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  enabled: boolean,
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler, enabled]);
}

function useKeyboardNavigation<T extends HTMLElement>(
  isOpen: boolean,
  closeMenu: () => void,
  contentRef: React.RefObject<T | null>,
): void {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          closeMenu();
          break;
        case 'ArrowDown':
          event.preventDefault();
          focusNextItem(contentRef, 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          focusNextItem(contentRef, -1);
          break;
        case 'Home':
          event.preventDefault();
          focusFirstItem(contentRef);
          break;
        case 'End':
          event.preventDefault();
          focusLastItem(contentRef);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu, contentRef]);
}

function focusNextItem<T extends HTMLElement>(
  contentRef: React.RefObject<T | null>,
  direction: number,
): void {
  if (!contentRef.current) return;

  const items = Array.from(
    contentRef.current.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])',
    ),
  );

  if (items.length === 0) return;

  const activeElement = document.activeElement as HTMLElement;
  const currentIndex = items.indexOf(activeElement);
  const nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < items.length) {
    items[nextIndex]?.focus();
  } else if (direction > 0) {
    items[0]?.focus();
  } else {
    items[items.length - 1]?.focus();
  }
}

function focusFirstItem<T extends HTMLElement>(contentRef: React.RefObject<T | null>): void {
  if (!contentRef.current) return;
  const firstItem = contentRef.current.querySelector<HTMLElement>(
    '[role="menuitem"]:not([aria-disabled="true"])',
  );
  firstItem?.focus();
}

function focusLastItem<T extends HTMLElement>(contentRef: React.RefObject<T | null>): void {
  if (!contentRef.current) return;
  const items = Array.from(
    contentRef.current.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])',
    ),
  );
  const lastItem = items[items.length - 1];
  lastItem?.focus();
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function DropdownMenu({
  children,
  className,
  defaultOpen = false,
  onOpenChange,
}: DropdownMenuProps): JSX.Element {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, openMenu, closeMenu, toggleMenu } = useDropdownState(defaultOpen, onOpenChange);

  useClickOutside(dropdownRef, closeMenu, isOpen);

  const contextValue = useMemo<DropdownContextValue>(() => {
    const id = generateId();
    return {
      isOpen,
      openMenu,
      closeMenu,
      toggleMenu,
      triggerId: `dropdown-trigger-${id}`,
      contentId: `dropdown-content-${id}`,
    };
  }, [isOpen, openMenu, closeMenu, toggleMenu]);

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={dropdownRef} className={cn('relative inline-block text-left', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownMenuTrigger({
  children,
  onClick,
  className,
  asChild = false,
}: DropdownMenuTriggerProps): JSX.Element {
  const { isOpen, toggleMenu, triggerId, contentId } = useDropdownContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      toggleMenu();
      onClick?.(e);
    },
    [toggleMenu, onClick],
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      'aria-expanded': isOpen,
      'aria-haspopup': 'menu' as const,
      'aria-controls': contentId,
      id: triggerId,
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium',
        'bg-card text-card-foreground border-border border',
        'hover:bg-secondary transition-all duration-200',
        'focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-controls={contentId}
      id={triggerId}
    >
      {children}
      <ChevronDown
        className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        aria-hidden="true"
      />
    </button>
  );
}

function DropdownMenuContent({
  children,
  className,
  align = 'start',
  sideOffset = 8,
}: DropdownMenuContentProps): JSX.Element | null {
  const { isOpen, closeMenu, contentId, triggerId } = useDropdownContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useKeyboardNavigation(isOpen, closeMenu, contentRef);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const firstItem = contentRef.current.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      );
      firstItem?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const alignmentClasses: Record<'start' | 'center' | 'end', string> = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      className={cn(
        'border-border absolute z-50 min-w-[12rem] rounded-lg border',
        'bg-popover text-popover-foreground shadow-lg',
        'animate-in fade-in-0 zoom-in-95 duration-200',
        alignmentClasses[align],
        className,
      )}
      style={{ marginTop: `${sideOffset}px` }}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

function DropdownMenuItem({
  children,
  onClick,
  className,
  disabled = false,
  onSelect,
}: DropdownMenuItemProps): JSX.Element {
  const { closeMenu } = useDropdownContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (disabled) return;

      e.stopPropagation();
      onClick?.(e);
      onSelect?.();
      closeMenu();
    },
    [disabled, onClick, onSelect, closeMenu],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        onSelect?.();
        closeMenu();
      }
    },
    [disabled, onClick, onSelect, closeMenu],
  );

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
      className={cn(
        'relative flex cursor-pointer items-center rounded-md px-3 py-2 text-sm outline-none select-none',
        'transition-colors duration-150',
        'hover:bg-secondary',
        'focus:bg-secondary',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      {children}
    </div>
  );
}

function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground px-3 py-2 text-xs font-semibold uppercase">
      {children}
    </div>
  );
}

function DropdownSeparator() {
  return <div className="bg-border my-1 h-px" />;
}

export {
  DropdownLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownSeparator,
};
export type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
};
