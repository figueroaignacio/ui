'use client';

import { useSearch } from '@/features/docs/hooks/use-search';
import { useDialogFocus } from '@/hooks/use-dialog-focus';
import { useKbdShortcut } from '@/hooks/use-kbd-shortcut';
import { Search02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Dialog } from '@repo/ui/components/dialog';
import { Kbd, KbdGroup } from '@repo/ui/components/kbd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

export function Searcher() {
  const t = useTranslations('components.searcher');
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery, clearQuery, results, navigation } = useSearch();
  const { inputRef, handleOpenChange } = useDialogFocus();

  useKbdShortcut(['cmd', 'k'], () => setIsOpen((prev) => !prev));

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
          <KbdGroup className="ml-auto hidden sm:flex">
            <Kbd size="sm">⌘</Kbd>
            <span className="text-muted-foreground">+</span>
            <Kbd size="sm">K</Kbd>
          </KbdGroup>
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-xl rounded-xl">
        <Dialog.Header>
          <Dialog.Title>NachUI Docs</Dialog.Title>
        </Dialog.Header>
        <div className="grid gap-4 py-10">
          <SearchInput
            value={query}
            onChange={setQuery}
            onClear={clearQuery}
            inputRef={inputRef}
            placeholder={t('placeholder')}
          />
          <SearchResults query={query} results={results} navigation={navigation} />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
