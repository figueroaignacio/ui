// Components
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Card } from '@repo/ui/components/card';

interface CardLinkProps {
  label: string;
  href: string;
}

export function CardLink({ label, href }: CardLinkProps) {
  return (
    <Link href={href}>
      <Card className="hover:bg-accent flex flex-col gap-y-6 p-4 hover:scale-[1.02] active:scale-[0.98]">
        <div>
          <h6 className="text-lg font-semibold">{label}</h6>
        </div>
        <div className="self-end">
          <ArrowRightIcon />
        </div>
      </Card>
    </Link>
  );
}
