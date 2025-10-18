// Components
import { Searcher } from './searcher';
import { ThemeToggle } from './theme-toggle';

export function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <Searcher />
      <ThemeToggle />
    </div>
  );
}
