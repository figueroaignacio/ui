'use client';

import { useSearch } from '@/features/docs/hooks/use-search';
import { useDialogFocus } from '@/hooks/use-dialog-focus';
import { useKbdShortcut } from '@/hooks/use-kbd-shortcut';
import { useRouter } from '@/i18n/navigation';
import { ArrowMoveDownLeftIcon, Search02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Dialog } from '@repo/ui/components/dialog';
import { Kbd } from '@repo/ui/components/kbd';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

export function Searcher() {
  const t = useTranslations('components.searcher');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    query,
    setQuery,
    clearQuery,
    results,
    navigation,
    selectedIndex,
    nextItem,
    previousItem,
    activeItems,
  } = useSearch();
  const { inputRef, handleOpenChange } = useDialogFocus();

  useKbdShortcut(['cmd', 'k'], () => setIsOpen((prev) => !prev));

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextItem();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        previousItem();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeItem = activeItems[selectedIndex];
        if (activeItem) {
          router.push(activeItem.href);
          setIsOpen(false);
          clearQuery();
        }
      }
    },
    [nextItem, previousItem, activeItems, selectedIndex, router, clearQuery],
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        handleOpenChange(open, clearQuery);
      }}
    >
      <Dialog.Trigger asChild>
        <button
          className="border-border/50 bg-secondary/50 text-muted-foreground hover:bg-secondary/80 hover:text-foreground flex h-9 w-full items-center gap-2 rounded-full border px-4 text-sm transition-colors sm:w-44"
          title={t('label')}
        >
          <HugeiconsIcon icon={Search02Icon} size={18} />
          <span>{t('placeholder')}</span>
          <div className="ml-auto hidden items-center gap-1 text-[10px] sm:flex">
            <Kbd size="sm">ctrl</Kbd>
            <span className="text-muted-foreground">+</span>
            <Kbd size="sm">K</Kbd>
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="bg-secondary/60 border-secondary-foreground/10 max-w-xl rounded-sm border backdrop-blur-sm">
        <Dialog.Header>
          <SearchInput
            value={query}
            onChange={setQuery}
            onClear={clearQuery}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            placeholder={t('placeholder')}
          />
        </Dialog.Header>
        <div className="grid gap-4">
          <SearchResults
            query={query}
            results={results}
            navigation={navigation}
            selectedIndex={selectedIndex}
          />
        </div>
        <Dialog.Footer>
          <div className="flex items-center gap-2">
            <Kbd size="sm" variant="outline" className="text-[10px]">
              esc
            </Kbd>
            <span className="text-muted-foreground text-xs">{t('exit')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd size="sm" variant="outline" className="text-[10px]">
              <HugeiconsIcon icon={ArrowMoveDownLeftIcon} size={10} />
            </Kbd>
            <span className="text-muted-foreground text-xs">{t('select')}</span>
          </div>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
