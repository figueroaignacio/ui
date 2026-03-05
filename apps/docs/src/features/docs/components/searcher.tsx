'use client';

import { useSearch } from '@/features/docs/hooks/use-search';
import { useDialogFocus } from '@/hooks/use-dialog-focus';
import { Search02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { useTranslations } from 'next-intl';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

export function Searcher() {
  const t = useTranslations('components.searcher');
  const { query, setQuery, clearQuery, results, navigation } = useSearch();
  const { inputRef, handleOpenChange } = useDialogFocus();

  return (
    <Dialog onOpenChange={(open) => handleOpenChange(open, clearQuery)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title={t('label')}
          leftIcon={<HugeiconsIcon icon={Search02Icon} size={16} />}
        />
      </DialogTrigger>
      <DialogContent className="max-w-xl rounded-xl">
        <DialogHeader>
          <DialogTitle>NachUI Docs</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
