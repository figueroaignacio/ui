import { fontSans } from '@/lib/font';
import { cn } from '@repo/ui/lib/cn';

type TypographyProps<T = HTMLElement> = React.HTMLAttributes<T>;

export function Link({ className, ...props }: TypographyProps<HTMLAnchorElement>) {
  return (
    <a
      className={cn('text-primary font-medium underline underline-offset-4', className)}
      {...props}
    />
  );
}

export function Paragraph({ className, ...props }: TypographyProps<HTMLParagraphElement>) {
  return (
    <p className={cn('text-[15px] leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  );
}

export function UnorderedList({ className, ...props }: TypographyProps<HTMLUListElement>) {
  return <ul className={cn('my-2 ml-6 list-disc', className)} {...props} />;
}

export function OrderedList({ className, ...props }: TypographyProps<HTMLOListElement>) {
  return <ol className={cn('my-2 ml-6 list-decimal', className)} {...props} />;
}

export function ListItem({ className, ...props }: TypographyProps<HTMLLIElement>) {
  return <li className={cn('mt-1 text-[14px]', className)} {...props} />;
}

export function Code({ className, ...props }: TypographyProps<HTMLElement>) {
  return (
    <code className={cn(`relative px-5 py-[0.2rem] ${fontSans.className}`, className)} {...props} />
  );
}

export function HorizontalRule(props: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className="my-4 md:my-8" {...props} />;
}
