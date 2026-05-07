'use client';

import { LayoutAlignBottomIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Drawer } from '@repo/ui/components/drawer';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { TocEntry, TocProps, Tree, useActiveItem } from './toc-tree';

export function MobileToc({ toc }: TocProps) {
  const itemIds = useMemo(() => {
    if (!toc) return [];
    const ids: string[] = [];
    const extractIds = (items: TocEntry[]) => {
      items.forEach((item) => {
        if (item.url) {
          const id = item.url.split('#')[1];
          if (id) ids.push(id);
        }
        if (item.items) extractIds(item.items);
      });
    };
    extractIds(toc);
    return ids;
  }, [toc]);
  const activeHeading = useActiveItem(itemIds);
  const t = useTranslations('components.mobileToc');
  const [open, setOpen] = useState(false);

  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={LayoutAlignBottomIcon} size={12} />
        <Drawer.Trigger variant="link" className="text-foreground p-0" size="sm">
          {t('label')}
        </Drawer.Trigger>
      </div>
      <Drawer.Content side="bottom" className="max-h-[80vh]">
        <Drawer.Header>
          <Drawer.Title className="text-sm font-semibold">{t('label')}</Drawer.Title>
        </Drawer.Header>
        <div className="mt-4 overflow-y-auto pb-8">
          <Tree tree={toc} activeItem={activeHeading} onItemClick={() => setOpen(false)} />
        </div>
      </Drawer.Content>
    </Drawer>
  );
}
