import { docs } from '@/content';

export function getDocs(locale: string) {
  return docs.filter((doc) => doc.locale === locale);
}
