'use client';

import { useMounted } from '@/hooks/use-mounted';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { TocProps, Tree, useActiveItem } from './toc-tree';

export function Toc({ toc }: TocProps) {
  const itemIds = useMemo(
    () =>
      toc
        ? toc
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();
  const t = useTranslations('components.toc');

  if (!toc || toc.length === 0) {
    return null;
  }

  if (!mounted) {
    return (
      <div className="sticky top-24 h-[calc(100vh-5rem)] space-y-4">
        <div className="bg-secondary h-2.5 w-16 animate-pulse rounded-full" />
        <div className="space-y-2.5">
          {[32, 28, 24, 36, 28, 20].map((w, i) => (
            <div
              key={i}
              className="bg-secondary animate-pulse rounded-full"
              style={{ height: 10, width: w * 4 }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="hide-scrollbar sticky top-24 h-[calc(100vh-5rem)] space-y-4 overflow-y-auto"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p className="text-muted-foreground/60 text-[10px] font-semibold tracking-[0.15em] uppercase">
        {t('label')}
      </p>

      <Tree tree={toc} activeItem={activeHeading} />
    </motion.div>
  );
}
