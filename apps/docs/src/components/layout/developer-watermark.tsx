import { useTranslations } from 'next-intl';

let githubUsername = 'figueroaignacio';

export function DeveloperWatermark() {
  const t = useTranslations('components.footer');

  return (
    <div className="flex items-center gap-3">
      <div className="ring-border relative h-10 w-10 overflow-hidden rounded-full ring-2">
        <img
          src={`https://github.com/${githubUsername}.png`}
          alt={`${githubUsername} avatar`}
          className="size-12 object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-foreground text-sm font-semibold">{githubUsername}</span>
        <span className="text-muted-foreground text-xs">{t('headline')}</span>
      </div>
    </div>
  );
}
