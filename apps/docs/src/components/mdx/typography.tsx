import { cn } from '@repo/ui/lib/cn';

type TypographyProps<T = HTMLElement> = React.HTMLAttributes<T>;

import { isValidElement } from 'react';
import { CodeBlock } from './codeblock';

interface PreProps {
  children: React.ReactNode;
}

export const Pre: React.FC<PreProps> = ({ children }) => {
  const child = (children as any)?.props;

  if (!child) return <pre>{children}</pre>;

  const language = child.className?.replace('language-', '') || 'tsx';

  const extractCode = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractCode).join('');
    if (isValidElement(node)) {
      return extractCode((node.props as { children?: React.ReactNode }).children);
    }
    if (typeof node === 'object' && 'value' in node) return String(node.value);
    return '';
  };
  const code = extractCode(child.children).trim();

  return <CodeBlock code={code} language={language} className="overflow-x-auto" />;
};

export function Link({ className, ...props }: TypographyProps<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'text-primary decoration-primary/30 font-medium underline underline-offset-4',
        'hover:decoration-primary/60 transition-colors duration-200',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  );
}

export function Paragraph({ className, ...props }: TypographyProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-foreground/90 text-[15px] leading-[1.75]', 'not-first:mt-6', className)}
      {...props}
    />
  );
}

export function UnorderedList({ className, ...props }: TypographyProps<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        'my-6 ml-6 list-disc space-y-2',
        'marker:text-muted-foreground [&>li]:pl-2',
        className,
      )}
      {...props}
    />
  );
}

export function OrderedList({ className, ...props }: TypographyProps<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal space-y-2',
        'marker:text-muted-foreground marker:font-medium [&>li]:pl-2',
        className,
      )}
      {...props}
    />
  );
}

export function ListItem({ className, ...props }: TypographyProps<HTMLLIElement>) {
  return (
    <li className={cn('text-foreground/90 text-[15px] leading-[1.75]', className)} {...props} />
  );
}

export function HorizontalRule({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('border-border my-8 md:my-12', className)} {...props} />;
}

export function Blockquote({ className, ...props }: TypographyProps<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        'border-primary/40 mt-6 border-l-4 pl-6 italic',
        'text-muted-foreground',
        '*:text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

export function Table({ className, ...props }: TypographyProps<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: TypographyProps<HTMLTableSectionElement>) {
  return <thead className={cn('border-border bg-muted/50 border-b', className)} {...props} />;
}

export function TableBody({ className, ...props }: TypographyProps<HTMLTableSectionElement>) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export function TableRow({ className, ...props }: TypographyProps<HTMLTableRowElement>) {
  return (
    <tr
      className={cn('border-border border-b transition-colors', 'hover:bg-muted/50', className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: TypographyProps<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'text-foreground h-12 px-4 text-left align-middle font-semibold',
        '[&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TypographyProps<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        'text-foreground/90 p-4 align-middle',
        '[&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}
