// Hooks
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

// Components
import { Logo } from '../common/logo';
import { GitHubIcon } from '../common/tech-icons';

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-foreground text-sm font-semibold">{title}</h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

export function Footer() {
  const t = useTranslations('sections');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-border border-t">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-6 lg:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs text-sm">{t('home.description')}</p>
            <div className="flex items-center gap-4">
              <SocialLink href="https://github.com" icon={GitHubIcon} label="GitHub" />
            </div>
          </div>
          <FooterSection title={t('footer.product.title')}>
            <FooterLink href="/docs">{t('footer.product.docs')}</FooterLink>
            <FooterLink href="/docs/components">{t('footer.product.components')}</FooterLink>
            <FooterLink href="/docs/installation">{t('footer.product.installation')}</FooterLink>
            <FooterLink href="/blog">{t('footer.product.blog')}</FooterLink>
          </FooterSection>
          <FooterSection title={t('footer.resources.title')}>
            <FooterLink href="/docs/concepts/theming">{t('footer.resources.theming')}</FooterLink>
            <FooterLink href="/docs/concepts/dark-mode">
              {t('footer.resources.darkMode')}
            </FooterLink>
            <FooterLink href="/docs/concepts/cli">{t('footer.resources.cli')}</FooterLink>
            <FooterLink href="/examples">{t('footer.resources.examples')}</FooterLink>
          </FooterSection>
          <FooterSection title={t('footer.community.title')}>
            <FooterLink href="https://github.com/figueroaignacio/ui">
              {t('footer.community.github')}
            </FooterLink>
          </FooterSection>
        </div>
        <div className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-muted-foreground text-center text-sm md:text-left">
              © {currentYear} I7A UI. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/sitemap.xml"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {t('footer.sitemap')}
              </Link>
              <Link
                href="/rss.xml"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                RSS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
