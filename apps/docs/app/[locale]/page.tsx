// Hooks
import { getTranslations } from 'next-intl/server';

// Utils
import { setRequestLocale } from 'next-intl/server';

// Components
import { LocaleSwitcher } from '@/components/locale-switcher';
import { CardLink } from '@/components/mdx/card-link';

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
      <section className="mx-auto flex min-h-[85svh] max-w-xl flex-col justify-center gap-y-3 px-3">
        <h1 className="text-muted-foreground text-sm font-bold">I7A UI</h1>
        <p className="text-lg font-semibold">{t('home.description')}</p>
        <div className="grid gap-3">
          {actions.map((action: { label: string; href: string; description: string }) => (
            <CardLink
              label={action.label}
              href={action.href}
              key={action.href}
              description={action.description}
            />
          ))}
        </div>
      </section>
    </>
  );
}
