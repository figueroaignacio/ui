'use client';

// Hooks
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Components
import { ViewVerticalIcon } from '@radix-ui/react-icons';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@repo/ui/components/drawer';

// Utils
import { cn } from '@repo/ui/lib/cn';

interface TocEntry {
  items?: TocEntry[];
  url: string;
  title: string;
}

interface MobileTocProps {
  toc: TocEntry[];
}

export function MobileToc({ toc }: MobileTocProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('components');

  return (
    <div>
      <Drawer>
        <DrawerTrigger className="mt-5 flex space-x-3">
          <ViewVerticalIcon />
          <span className="text-xs">{t('toc.label')}</span>
        </DrawerTrigger>
        <DrawerContent side="right" size="lg">
          <p className="text-xs font-medium">{t('toc.label')}</p>
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
        <li key={index} className="mt-5 mb-5">
          <DrawerClose>
            <a
              href={item.url}
              onClick={onLinkClick}
              className="text-muted-foreground hover:text-foreground block text-sm transition hover:underline"
            >
              {item.title}
            </a>
          </DrawerClose>
          {item.items?.length ? (
            <TreeMobile tree={item.items} level={level + 1} onLinkClick={onLinkClick} />
          ) : null}
        </li>
      ))}
    </ul>
  ) : null;
}
