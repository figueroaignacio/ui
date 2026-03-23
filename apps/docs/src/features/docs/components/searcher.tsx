'use client';

import { useSearch } from '@/features/docs/hooks/use-search';
import { useDialogFocus } from '@/hooks/use-dialog-focus';
import { Search02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Dialog } from '@repo/ui/components/dialog';
import { useTranslations } from 'next-intl';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

export function Searcher() {
  const t = useTranslations('components.searcher');
  const { query, setQuery, clearQuery, results, navigation } = useSearch();
  const { inputRef, handleOpenChange } = useDialogFocus();

  return (
    <Dialog onOpenChange={(open) => handleOpenChange(open, clearQuery)}>
      <Dialog.Trigger asChild>
        <button
          className="border-border/50 bg-secondary/50 text-muted-foreground hover:bg-secondary/80 hover:text-foreground flex h-9 w-full items-center gap-2 rounded-full border px-4 text-sm transition-colors sm:w-44"
          title={t('label')}
        >
          <HugeiconsIcon icon={Search02Icon} size={18} />
          <span>{t('placeholder')}</span>
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
