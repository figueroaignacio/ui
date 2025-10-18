'use client';

// Hooks
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

// Components
import { GlobeIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';

// Config
import { locales } from '@/i18n/routing';

// Types
import { Locale } from 'next-intl';

export function LocaleSwitcher() {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  function onLocaleChange(value: string) {
    const newLocale = value as Locale;
    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="items-center space-x-2">
        <GlobeIcon />
        <span>{locale.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => onLocaleChange(localeOption)}
            className={`flex items-center justify-between ${
              locale === localeOption ? 'text-accent-foreground' : ''
            }`}
          >
            {localeOption.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
