'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@repo/ui/components/button';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export function CTASection() {
  const t = useTranslations('sections.home');

  return (
    <section className="py-32 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-4xl font-bold"
      >
        {t('ctaTitle')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground mx-auto mb-8 max-w-xl"
      >
        {t('ctaDescription')}
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Link href="/docs">
          <Button size="lg" className="font-semibold">
            {t('ctaButton')}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
