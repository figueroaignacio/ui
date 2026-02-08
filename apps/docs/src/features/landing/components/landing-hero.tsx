import { CardLink } from '@/components/common/card-link';
import {
  MotionIcon,
  NextJSIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from '@/components/common/tech-icons';
import { useTranslations } from 'next-intl';

interface HomePageActions {
  href: string;
  label: string;
  description: string;
  variant?: 'default' | 'secondary';
}

export function LandingHero() {
  const t = useTranslations('sections.home');
  const actions: HomePageActions[] = t.raw('actions');

  return (
    <div className="bg-grid-pattern relative flex min-h-svh items-center justify-center overflow-hidden">
      <section className="relative z-10 mx-auto max-w-3xl flex-col space-y-4 px-4 py-16 md:px-0">
        <div className="flex items-center gap-4">
          <ReactIcon />
          <MotionIcon />
          <TailwindIcon />
          <TypescriptIcon />
          <NextJSIcon />
        </div>
        <h1 className="from-foreground to-foreground/30 bg-linear-to-br bg-clip-text text-4xl leading-tight font-extrabold tracking-tight text-balance text-transparent md:text-5xl">
          {t('subheading')}
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed text-pretty md:text-xl">
          {t('description')}
        </p>
        <div className="z-50 flex flex-col gap-4 pt-4 sm:flex-row">
          {actions.map((action) => {
            return (
              <CardLink
                key={action.href}
                label={action.label}
                description={action.description}
                href={action.href}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
