import { LocaleSwitcher } from '../common/locale-switcher';

export function HeaderActions() {
  return (
    <div className="space-x-4">
      <LocaleSwitcher />
    </div>
  );
}
