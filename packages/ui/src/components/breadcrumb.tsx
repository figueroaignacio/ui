import { ArrowRight01Icon, MoreHorizontalIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '@repo/ui/lib/cn';
import * as React from 'react';

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" className={className} {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('inline-flex items-center gap-1.5', className)} {...props} />;
}

type BreadcrumbLinkProps = React.ComponentProps<'a'> & {
  children: React.ReactNode;
};

function BreadcrumbLink({ className, children, ...props }: BreadcrumbLinkProps) {
  const isLinkComponent =
    React.isValidElement(children) &&
    (typeof children.type === 'function' || typeof children.type === 'object');

  if (isLinkComponent) {
    return <span className={cn('hover:text-foreground', className)}>{children}</span>;
  }

  return (
    <a className={cn('hover:text-foreground', className)} {...props}>
      {children}
    </a>
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="size-3.5" />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" size={16} />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
