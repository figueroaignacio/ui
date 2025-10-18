// Components
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Card } from '@repo/ui/components/card';

interface CardLinkProps {
  label: string;
  href: string;
  description?: string;
}

export function CardLink({ label, href, description }: CardLinkProps) {
  return (
    <Link href={href}>
      <Card className="hover:bg-accent flex min-h-full flex-col gap-y-2 p-4 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98]">
        <div>
          <h6 className="text-lg font-semibold">{label}</h6>
        </div>
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
        <div className="self-end">
          <ArrowRightIcon />
        </div>
      </Card>
    </Link>
  );
}
