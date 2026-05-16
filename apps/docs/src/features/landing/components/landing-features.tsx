'use client';

import {
  AiBrain01Icon,
  BookOpen01Icon,
  FlashIcon,
  Layers01Icon,
  PlayIcon,
  SourceCodeIcon,
  UniversalAccessIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Card } from '@repo/ui/components/card';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

interface FeatureItem {
  title: string;
  description: string;
}

const icons = [
  AiBrain01Icon,
  UniversalAccessIcon,
  BookOpen01Icon,
  SourceCodeIcon,
  FlashIcon,
  PlayIcon,
  Layers01Icon,
  UniversalAccessIcon,
];

export function LandingFeatures() {
  const t = useTranslations('sections.home.features');
  const items: FeatureItem[] = t.raw('items');

  return (
    <section className="bg-background relative z-10 w-full pt-12 pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="flex flex-col items-center gap-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="font-heading text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              {t('title')}
              <br />
              <span className="text-muted-foreground">{t('subtitle')}</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg sm:text-xl">
              {t('description')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {items.map((feature, idx) => {
              const Icon = icons[idx];

              return (
                <motion.div key={idx} variants={itemVariants} className="h-full">
                  <Card variant="default" className="gap-y-2">
                    <Card.Header className="gap-y-4">
                      {Icon && (
                        <div className="bg-primary/10 text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
                          <HugeiconsIcon icon={Icon} size={24} />
                        </div>
                      )}
                      <Card.Title>{feature.title}</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <Card.Description>{feature.description}</Card.Description>
                    </Card.Content>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
