import {
  MotionIcon,
  NextJSIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from '@/components/common/tech-icons';
import { useTranslations } from 'next-intl';

interface TechnologyConfig {
  icon: React.ReactNode;
  span?: string;
  gradient: string;
  accentColor: string;
}

const technologiesConfig: Record<string, TechnologyConfig> = {
  TypeScript: {
    icon: <TypescriptIcon />,
    gradient: 'from-blue-500/20 via-blue-400/10 to-transparent',
    accentColor: 'blue',
  },
  React: {
    icon: <ReactIcon />,
    span: 'lg:col-span-2',
    gradient: 'from-cyan-500/20 via-blue-400/10 to-transparent',
    accentColor: 'cyan',
  },
  'Next.js': {
    icon: <NextJSIcon />,
    gradient: 'from-slate-900/20 via-slate-700/10 to-transparent',
    accentColor: 'slate',
  },
  Motion: {
    icon: <MotionIcon />,
    gradient: 'from-purple-500/20 via-pink-400/10 to-transparent',
    accentColor: 'purple',
    span: '',
  },
  'Tailwind CSS': {
    icon: <TailwindIcon />,
    gradient: 'from-cyan-400/20 via-cyan-300/10 to-transparent',
    accentColor: 'cyan',
  },
};

export function LandingTechSection() {
  const t = useTranslations('sections.home.tech');

  const technologies = t.raw('technologies') as Array<{
    name: string;
    description: string;
  }>;

  return (
    <section className="bg-background relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="bg-grid-pattern absolute inset-0 opacity-50"></div>
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-12 md:mb-16">
          <h2 className="gradient-text mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => {
            const config = technologiesConfig[tech.name];
            return (
              <div key={tech.name} className={`group relative h-full ${config.span || ''}`}>
                <div className="bg-card border-border h-full overflow-hidden rounded-xl border">
                  <div className="relative z-10 flex h-full flex-col justify-between p-6">
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <div className="">{config.icon}</div>
                      </div>
                      <h3 className="text-card-foreground group-hover:text-foreground mb-3 text-xl font-semibold transition-colors duration-300">
                        {tech.name}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-card-foreground/80 text-sm leading-relaxed transition-colors duration-300">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
