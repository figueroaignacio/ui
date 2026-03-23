import { Checkbox } from '@repo/ui/components/checkbox';
import { Spinner } from '@repo/ui/components/spinner';
import { Switch } from '@repo/ui/components/switch';

export function PreviewControls() {
  return (
    <div className="flex items-center justify-between gap-2 px-5">
      <Checkbox defaultChecked className="rounded-md" />
      <Switch defaultChecked />

      {/* Placeholder for radio unselected */}
      <div className="bg-secondary size-5 rounded-full"></div>

      {/* Placeholder for radio selected */}
      <div className="bg-primary flex size-5 items-center justify-center rounded-full">
        <div className="bg-background size-2 rounded-full"></div>
      </div>

      <Spinner size="md" variant="primary" />
    </div>
  );
}
