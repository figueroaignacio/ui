// Components
import { Link } from '@/i18n/navigation';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

// Utils
import { buttonVariants } from './ui/button';

export function GitHubLink() {
  return (
    <Link
      href="https://github.com/figueroaignacio/ui"
      target="_blank"
      className={`${buttonVariants({
        variant: 'ghost',
        size: 'icon',
      })}`}
    >
      <GitHubLogoIcon />
    </Link>
  );
}
