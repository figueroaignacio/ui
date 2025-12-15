import { cn } from '@repo/ui/lib/cn';

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="border-border my-6 w-full overflow-auto rounded-xl border text-sm">
      <table
        className={cn('w-full border-separate border-spacing-0 text-sm', className)}
        {...props}
      />
    </div>
  );
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('m-0 p-0 text-xs', className)} {...props} />;
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th
      className={cn(
        'bg-card border-b px-4 py-2 text-left text-sm font-semibold' +
          '[[align=center]]:text-center [[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.HTMLAttributes<HTMLTableDataCellElement>) {
  return (
    <td
      className={cn(
        'border-b p-4 text-left text-xs' +
          '[[align=center]]:text-center [[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  );
}
