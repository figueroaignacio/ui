// Hooks
import { useTranslations } from 'next-intl';

// Components
import { DeveloperWatermark } from './developer-watermark';

export function Footer() {
  const t = useTranslations('components.footer');

  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto px-6 py-3">
        <div className="flex flex-col justify-between gap-4 sm:flex-row lg:items-center">
          <DeveloperWatermark />
          <p className="text-muted-foreground hidden text-xs lg:block">
            © {new Date().getFullYear()} {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
