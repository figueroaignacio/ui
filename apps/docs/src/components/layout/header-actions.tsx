// Components
import { LocaleSwitcher } from '../common/locale-switcher';
import { ThemeToggle } from '../common/theme-toggle';
import { Searcher } from '../docs/searcher';

export function HeaderActions() {
  return (
    <div className="flex items-center gap-x-2">
      <LocaleSwitcher />
      <Searcher />
      <ThemeToggle />
    </div>
  );
}
