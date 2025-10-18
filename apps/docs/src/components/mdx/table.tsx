// components/mdx/table.tsx
import { cn } from '@repo/ui/lib/cn';

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  );
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('even:bg-muted m-0 border-t p-0', className)} {...props} />;
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
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
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  );
}
