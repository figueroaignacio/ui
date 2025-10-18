// Components
import { LocaleSwitcher } from './locale-switcher';
import { Searcher } from './searcher';
import { ThemeToggle } from './theme-toggle';

export function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <LocaleSwitcher />
      <Searcher />
      <ThemeToggle />
    </div>
  );
}
