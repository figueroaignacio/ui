'use client';

// Hooks
import { useDialogFocus } from '@/hooks/use-dialog-focus';
import { useSearch } from '@/hooks/use-search';
import { useTranslations } from 'next-intl';

// Components
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
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
          variant="outline"
          size="default"
          className="w-40 justify-start gap-6"
          aria-label={t('label')}
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
          <span className="font-light">{t('label')}...</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>I7A UI docs</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
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
