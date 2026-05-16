'use client';

import { GitHubIcon } from '@/components/common/tech-icons';
import { StarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Card } from '@repo/ui/components/card';
import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

const GITHUB_URL = 'https://github.com/figueroaignacio/ui';

const starVariants: Variants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: [1, 1.3, 1.15],
    rotate: [0, -15, 15, 0],
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function GitHubStarHeroCta() {
  const t = useTranslations('components.githubStar');

  return (
    <motion.a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-border/60 bg-card hover:border-primary/30 hover:bg-accent/50 relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-5 py-2.5 shadow-sm transition-colors duration-300"
      whileHover="hover"
      initial="idle"
      aria-label={t('ariaLabel')}
    >
      <motion.div
        className="via-primary/[0.07] pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent to-transparent"
        style={{ width: '200%' }}
        animate={{ x: ['-100%', '100%'] }}
      />

      <span className="relative flex items-center gap-2.5">
        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          <GitHubIcon />
        </span>
        <span className="text-foreground/80 group-hover:text-foreground text-sm font-medium transition-colors duration-200">
          {t('heroLabel')}
        </span>
      </span>

      <span className="bg-primary/10 text-primary group-hover:bg-primary/20 relative flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors duration-200">
        <motion.span variants={starVariants} className="flex items-center">
          <HugeiconsIcon icon={StarIcon} size={14} />
        </motion.span>
        <span className="text-xs font-semibold">{t('starAction')}</span>
      </span>
    </motion.a>
  );
}

export function GitHubStarTocCta() {
  const t = useTranslations('components.githubStar');

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-border/40 mt-6 border-t pt-5"
    >
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group block no-underline"
        aria-label={t('ariaLabel')}
      >
        <Card
          variant="ghost"
          className="border-border/50 bg-card/50 group-hover:border-primary/30 group-hover:bg-accent/40 gap-y-0 rounded-lg border p-0 transition-all duration-250 group-hover:shadow-sm"
        >
          <Card.Content compact className="flex items-center gap-2.5 px-3 py-2.5">
            <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              <GitHubIcon />
            </span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-foreground/80 group-hover:text-foreground text-[11px] leading-tight font-semibold">
                {t('tocTitle')}
              </span>
              <span className="text-muted-foreground/70 text-[10px] leading-tight">
                {t('tocSubtitle')}
              </span>
            </span>
            <span className="text-primary/70 group-hover:text-primary flex items-center gap-1 transition-colors duration-200">
              <HugeiconsIcon icon={StarIcon} size={12} />
            </span>
          </Card.Content>
        </Card>
      </a>
    </motion.div>
  );
}
