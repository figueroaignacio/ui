'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '../lib/cn';
import { Button } from './button';

type DropdownChildProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

function DropdownMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = () => closeMenu();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const items = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<DropdownChildProps>, {
          isOpen,
          toggleMenu,
          closeMenu,
        })
      : child,
  );

  return (
    <div
      className={cn('relative inline-block text-left', className)}
      onClick={(e) => e.stopPropagation()}
    >
      {items}
    </div>
  );
}

function DropdownMenuTrigger({
  children,
  onClick,
  toggleMenu,
  className,
  isOpen,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  toggleMenu?: () => void;
  className?: string;
  isOpen?: boolean;
}) {
  return (
    <Button
      onClick={() => {
        toggleMenu?.();
        onClick?.();
      }}
      variant="ghost"
      size="sm"
      className={className}
    >
      {children}
      <svg
        className={cn('ml-2 h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </Button>
  );
}

function DropdownMenuContent({
  isOpen,
  children,
  className,
}: {
  isOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'border-border bg-card absolute z-10 mt-2 w-full rounded-lg border shadow-lg',
        className,
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  );
}

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
      className={cn('hover:bg-muted cursor-pointer px-3 py-2 text-sm', className)}
    >
      {children}
    </div>
  );
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger };
