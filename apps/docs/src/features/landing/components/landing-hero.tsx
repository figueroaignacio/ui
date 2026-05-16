'use client';

import { GitHubIcon } from '@/components/common/tech-icons';
import { ThemeColorSwitcher } from '@/features/theme/components/theme-color-switcher';
import { Link } from '@/i18n/navigation';
import { ArrowRight02Icon, SourceCodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { HeroComponentPreview } from './hero-component-preview';

interface HomePageActions {
  href: string;
  label: string;
  description: string;
  variant?: 'default' | 'secondary';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function LandingHero() {
  const t = useTranslations('sections.home');
  const actions: HomePageActions[] = t.raw('actions');

  return (
    <div className="bg-background relative flex min-h-svh flex-col items-center justify-start overflow-hidden pt-24 pb-16">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-3"
      >
        <motion.div variants={itemVariants} className="space-y-2 text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
            {t('subheading1')}
          </h1>
          <h1 className="text-muted-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
            {t('subheading2')}
          </h1>
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mx-auto max-w-2xl text-center text-lg md:text-xl"
        >
          {t('description')}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 pt-4 sm:flex-row"
        >
          <Button size="sm" rightIcon={<HugeiconsIcon icon={ArrowRight02Icon} size={18} />} asChild>
            <Link href="/docs">{actions[0]?.label || 'Get started'}</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<HugeiconsIcon icon={SourceCodeIcon} size={18} />}
            asChild
          >
            <Link href="/docs/components">{actions[1]?.label || 'View components'}</Link>
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center gap-6 sm:flex-row"
        >
          <div className="border-border/50 bg-muted/30 hover:bg-muted/50 flex items-center gap-2.5 rounded-full border px-4 py-2 shadow-sm backdrop-blur-sm transition-all">
            <span className="text-muted-foreground mr-1 text-sm font-medium">Theme</span>
            <ThemeColorSwitcher />
          </div>
          <div className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-x-3 text-xs hover:underline">
            <GitHubIcon />
            <a
              href="https://github.com/figueroaignacio/ui"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {t('github')}
            </a>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="relative mt-12 w-full">
          <HeroComponentPreview />
        </motion.div>
      </motion.section>
    </div>
  );
}
