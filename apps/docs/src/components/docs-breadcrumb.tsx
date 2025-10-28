import { Link } from '@/i18n/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';

type DocsBreadcrumbProps = {
  slugAsParams: string;
};

export function DocsBreadcrumb({ slugAsParams }: DocsBreadcrumbProps) {
  const slugParts = slugAsParams?.split('/').filter(Boolean) || [];

  const breadcrumbs = slugParts.map((part, index) => {
    const href = `/docs/${slugParts.slice(0, index + 1).join('/')}`;
    const isLast = index === slugParts.length - 1;
    const label = part.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    return { href, label, isLast };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/docs">Docs</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((crumb) => (
          <div key={crumb.href} className="contents">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
