'use client';

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
      <Card hoverable clickable className="flex flex-col transition-all duration-150">
        <CardHeader>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        {description && (
          <CardContent>
            <p className="text-muted-foreground text-sm">{description}</p>
          </CardContent>
        )}
        <CardFooter align="end">
          <ArrowRightIcon className="text-muted-foreground" />
        </CardFooter>
      </Card>
    </Link>
  );
}
