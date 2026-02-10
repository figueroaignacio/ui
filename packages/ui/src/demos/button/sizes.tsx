import { Plus, Settings } from 'lucide-react';
import { Button } from '../../components/button';

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Settings">
          <Settings className="size-4" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm" leftIcon={<Plus className="size-4" />}>
          Add small
        </Button>
        <Button size="default" leftIcon={<Plus className="size-4" />}>
          Add default
        </Button>
        <Button size="lg" leftIcon={<Plus className="size-5" />}>
          Add large
        </Button>
      </div>
    </div>
  );
}
