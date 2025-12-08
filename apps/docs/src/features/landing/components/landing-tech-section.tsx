// Hooks
import { useTranslations } from 'next-intl';

// Components
import {
  MotionIcon,
  NextJSIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from '@/components/common/tech-icons';

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
      <div className="bg-grid-pattern absolute inset-0"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="from-foreground to-foreground/70 mb-4 bg-linear-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => {
            const config = technologiesConfig[tech.name];
            return (
              <div key={tech.name} className={`group relative h-full ${config.span || ''}`}>
                <div className="border-border bg-card h-full overflow-hidden rounded-xl border">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${config.gradient} rounded-xl opacity-100 transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-${config.accentColor}-500/20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                        ></div>
                        <div className="text-foreground/90 group-hover:text-foreground relative text-5xl transition-all duration-300 group-hover:scale-110 md:text-6xl">
                          {config.icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-card-foreground group-hover:text-foreground mb-2 text-xl font-semibold transition-colors duration-300 md:text-2xl">
                        {tech.name}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-card-foreground/80 text-sm leading-relaxed transition-colors duration-300 md:text-base">
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
