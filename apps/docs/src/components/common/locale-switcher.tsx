'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

// Types
import type { Locale } from 'next-intl';

// Config
import { locales } from '@/i18n/routing';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [_, startTransition] = useTransition();

  function handleLocaleChange(newLocale: Locale) {
    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale });
    });
  }

  return (
    <div className="flex items-center gap-2">
      {locales.map((localeOption) => (
        <button
          key={localeOption}
          onClick={() => handleLocaleChange(localeOption as Locale)}
          className={`text-sm font-medium transition-colors ${
            locale === localeOption
              ? 'text-foreground underline underline-offset-4'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {localeOption.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
