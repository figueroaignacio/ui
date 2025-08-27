'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from './button';

// Dropdown Menu
function DropdownMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = event.target as HTMLElement;
      if (menu && !menu.closest('.dropdown-menu')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const items = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<any>, {
          isOpen,
          toggleMenu,
          closeMenu,
        })
      : child,
  );

  return (
    <div className={cn('dropdown-menu relative inline-block text-left', className)}>{items}</div>
  );
}

// Trigger
function DropdownMenuTrigger({
  children,
  onClick,
  toggleMenu,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  toggleMenu?: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={() => {
        toggleMenu?.();
        onClick?.();
      }}
      aria-expanded={false}
      aria-controls="dropdown-menu-content"
      variant="outline"
      size="default"
    >
      {children}
      <svg
        className="ml-2 h-5 w-5 transform transition-transform"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.292 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  );
}

// Content
function DropdownMenuContent({
  isOpen,
  children,
  className,
}: {
  isOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    isOpen && (
      <div
        id="dropdown-menu-content"
        className={cn(
          'bg-card border-border absolute z-10 mt-2 w-full rounded-xl border px-2 shadow-lg',
          className,
        )}
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className="py-2">{children}</div>
      </div>
    )
  );
}

// Item
function DropdownMenuItem({
  children,
  onClick,
  closeMenu,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  closeMenu?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={() => {
        onClick?.();
        closeMenu?.();
      }}
      className={cn(
        'text-foreground hover:bg-accent block cursor-pointer rounded-xl px-4 py-2 text-sm',
        className,
      )}
      role="menuitem"
    >
      {children}
    </div>
  );
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger };
