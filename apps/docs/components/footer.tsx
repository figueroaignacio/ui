import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('sections');

  return (
    <footer className="text-foreground mx-auto flex w-full max-w-[1580px] border-b border-t px-5 py-4 text-sm backdrop-blur-sm md:px-10 lg:px-20">
      <p>
        {t('footer.sourceCode')}
        <a href="https://github.com/figueroaignacio/I7A UI-ui" target="blank" className="underline">
          GitHub
        </a>
      </p>
    </footer>
  );
}
