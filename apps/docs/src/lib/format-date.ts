import type { Locale as DateFnsLocale } from 'date-fns';
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Locale } from 'next-intl';

const localeMap: Record<Locale, DateFnsLocale> = {
  es,
  en: enUS,
};

function getDateLocale(locale: Locale): DateFnsLocale {
  return localeMap[locale];
}

export function formatDateOnly(date: string | Date, locale: Locale): string {
  const dateLocale = getDateLocale(locale);

  if (locale === 'es') {
    return format(new Date(date), "d 'de' MMMM 'de' yyyy", {
      locale: dateLocale,
    });
  }

  return format(new Date(date), 'MMMM d, yyyy', {
    locale: dateLocale,
  });
}
