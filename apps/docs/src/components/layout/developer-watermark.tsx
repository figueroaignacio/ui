import { useTranslations } from 'next-intl';
import Image from 'next/image';

const GITHUB_USERNAME = 'figueroaignacio';

export function DeveloperWatermark() {
  const t = useTranslations('components.footer');

  return (
    <div className="flex items-center gap-3">
      <div className="ring-border relative h-10 w-10 overflow-hidden rounded-full ring-2">
        <Image
          src={`https://github.com/${GITHUB_USERNAME}.png`}
          alt={`${GITHUB_USERNAME} avatar`}
          width={48}
          height={48}
          className="size-12 object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-foreground text-sm font-semibold">{GITHUB_USERNAME}</span>
        <span className="text-muted-foreground text-xs">{t('headline')}</span>
      </div>
    </div>
  );
}
