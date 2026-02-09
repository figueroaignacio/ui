import { Link } from '@/i18n/navigation';
import { Home01Icon, Search02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button, ButtonGroup } from '@repo/ui/components/button';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('docs.notFound');

  return (
    <div className="relative flex min-h-[85svh] items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="relative mb-8">
          <h1 className="text-5xl leading-none font-black tracking-tighter">Error 404</h1>
        </div>
        <p className="text-muted-foreground mx-auto mb-12 max-w-md text-balance">
          {t('description')}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonGroup>
            <Link href="/">
              <Button
                size="sm"
                variant="secondary"
                leftIcon={
                  <HugeiconsIcon
                    icon={Home01Icon}
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                  />
                }
              >
                {t('goHome')}
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="sm"
                variant="ghost"
                leftIcon={
                  <HugeiconsIcon
                    icon={Search02Icon}
                    className="h-4 w-4 transition-transform group-hover:scale-110"
                  />
                }
              >
                {t('goDocs')}
              </Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
