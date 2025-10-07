'use client';

import * as React from 'react';

// Hooks
import { useTranslations } from 'next-intl';

// Components
import { ViewVerticalIcon } from '@radix-ui/react-icons';

// Utils
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';

interface TocEntry {
  items?: TocEntry[];
  url: string;
  title: string;
}

interface MobileTocProps {
  toc: TocEntry[];
}

export function MobileToc({ toc }: MobileTocProps) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations('components');

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="mt-5 flex space-x-3">
          <ViewVerticalIcon />
          <span className="text-xs">{t('toc.mobile.label')}</span>
        </DrawerTrigger>
        <DrawerContent side="bottom" size="lg">
          <TreeMobile tree={toc} onLinkClick={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function TreeMobile({
  tree,
  level = 1,
  onLinkClick,
}: {
  tree: TocEntry[];
  level?: number;
  onLinkClick?: () => void;
}) {
  return tree.length && level < 3 ? (
    <ul className={cn('list-none', { 'pl-4': level !== 1 })}>
      {tree.map((item, index) => (
        <li key={index} className="mb-5 mt-5">
          <a
            href={item.url}
            onClick={onLinkClick}
            className="text-muted-foreground hover:text-foreground block text-sm transition hover:underline"
          >
            {item.title}
          </a>
          {item.items?.length ? (
            <TreeMobile tree={item.items} level={level + 1} onLinkClick={onLinkClick} />
          ) : null}
        </li>
      ))}
    </ul>
  ) : null;
}
