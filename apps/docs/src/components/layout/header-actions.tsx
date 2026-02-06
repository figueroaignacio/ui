import { LocaleSwitcher } from '../common/locale-switcher';
import { ThemeToggle } from '../common/theme-toggle';

export function HeaderActions() {
  return (
    <div className="space-x-4">
      <LocaleSwitcher />
      <ThemeToggle />
    </div>
  );
}
