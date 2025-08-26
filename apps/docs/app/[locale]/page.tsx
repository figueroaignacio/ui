// Hooks
import { getTranslations } from 'next-intl/server';

// Utils
import { setRequestLocale } from 'next-intl/server';

// Components
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from '@radix-ui/react-icons';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('sections');
  const actions = t.raw('home.actions');

  setRequestLocale(locale);

  return (
    <section className="mx-auto flex min-h-lvh max-w-xl flex-col justify-center gap-y-3">
      <h1 className="text-xl">
        <span className="font-bold">I7A UI</span> - React UI Kit
      </h1>
      <p className="text-muted-foreground text-sm">{t('home.description')}</p>
      {actions.map((action: { label: string; href: string }) => (
        <Link
          href={action.href}
          key={action.href}
          className="text-primary flex items-center gap-x-2 text-sm underline"
        >
          {action.label}
          <ArrowRightIcon />
        </Link>
      ))}
    </section>
  );
}
