'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { Check, Languages } from 'lucide-react';
import type { Locale } from 'next-intl';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

const LOCALE_LABELS: Record<string, string> = {
  es: 'Español',
  en: 'English',
};

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(newLocale: Locale) {
    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale });
    });
  }

  const getLocaleLabel = (code: string) => {
    return LOCALE_LABELS[code] || code.toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[140px] justify-between">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 opacity-70" />
          <span className="text-xs">{getLocaleLabel(locale)}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => handleLocaleChange(localeOption as Locale)}
            disabled={isPending}
            className="justify-between"
          >
            <span className={locale === localeOption ? 'font-medium' : ''}>
              {getLocaleLabel(localeOption)}
            </span>
            {locale === localeOption && <Check className="text-foreground ml-2 h-3.5 w-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
