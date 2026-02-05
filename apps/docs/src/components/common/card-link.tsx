// Components
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/card';

interface CardLinkProps {
  label: string;
  href: string;
  description?: string;
}

export function CardLink({ label, href, description }: CardLinkProps) {
  return (
    <Link href={href}>
      <Card className="border-border hover:bg-secondary group bg-card flex flex-1 flex-col gap-2 rounded-xl border p-4 transition-all active:scale-95">
        <CardHeader compact>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        {description && (
          <CardContent compact>
            <p className="text-muted-foreground text-sm">{description}</p>
          </CardContent>
        )}
        <CardFooter align="end" compact>
          <ArrowRightIcon className="text-muted-foreground" />
        </CardFooter>
      </Card>
    </Link>
  );
}
