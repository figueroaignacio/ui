// Components
import { Searcher } from '../../features/docs/components/searcher';
import { LocaleSwitcher } from '../common/locale-switcher';
import { ThemeToggle } from '../common/theme-toggle';

export function HeaderActions() {
  return (
    <div className="flex items-center gap-x-2">
      <LocaleSwitcher />
      <Searcher />
      <ThemeToggle />
    </div>
  );
}
