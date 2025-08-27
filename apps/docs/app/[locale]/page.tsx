// Hooks
import { getTranslations } from 'next-intl/server';

// Utils
import { setRequestLocale } from 'next-intl/server';

// Components
import { LocaleSwitcher } from '@/components/locale-switcher';
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
    <>
      <header className="mx-auto flex max-w-xl items-center justify-end gap-x-3 pt-5">
        <LocaleSwitcher />
      </header>
      <section className="mx-auto flex min-h-[85svh] max-w-xl flex-col justify-center gap-y-3">
        <h1 className="text-muted-foreground text-sm font-bold">I7A UI</h1>
        <p className="text-lg font-semibold">{t('home.description')}</p>
        <h2 className="text-muted-foreground text-sm">{t('home.developer')}</h2>
        {actions.map((action: { label: string; href: string }) => (
          <Link
            href={action.href}
            key={action.href}
            className="text-primary flex w-fit items-center gap-x-2 text-sm underline transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {action.label}
            <ArrowRightIcon />
          </Link>
        ))}
      </section>
    </>
  );
}
