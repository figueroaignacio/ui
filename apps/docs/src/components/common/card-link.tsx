'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Card } from '@repo/ui/components/card';

interface CardLinkProps {
  label: string;
  href: string;
  description?: string;
}

export function CardLink({ label, href, description }: CardLinkProps) {
  return (
    <Link href={href}>
      <Card className="border-border hover:bg-secondary group bg-card flex flex-1 flex-col gap-2 rounded-xl border p-4 transition-all active:scale-95">
        <Card.Header compact>
          <Card.Title>{label}</Card.Title>
        </Card.Header>
        {description && (
          <Card.Content compact>
            <p className="text-muted-foreground text-sm">{description}</p>
          </Card.Content>
        )}
        <Card.Footer align="end" compact>
          <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
        </Card.Footer>
      </Card>
    </Link>
  );
}
