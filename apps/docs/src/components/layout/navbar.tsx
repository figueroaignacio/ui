import { Searcher } from '@/features/docs/components/searcher';
import { Link } from '@/i18n/navigation';
import type { Navigation } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { Logo } from '../common/logo';
import { AiChat } from '@/features/chat/components/ai-chat';

export function Navbar() {
  const t = useTranslations('ui');
  const navigation: Navigation[] = t.raw('navigation');

  return (
    <div className="relative z-50 hidden w-full items-center justify-between px-6 py-3 lg:flex">
      <div className="flex items-center justify-between gap-x-6">
        <Logo />
        <nav className="space-x-5">
          {navigation.map((item) => (
            <Link
              className="text-muted-foreground hover:text-foreground text-sm hover:underline"
              href={item.href}
              key={item.href}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <AiChat />
        <Searcher />
      </div>
    </div>
  );
}
