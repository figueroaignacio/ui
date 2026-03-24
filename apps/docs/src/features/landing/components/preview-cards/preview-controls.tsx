import { Checkbox } from '@repo/ui/components/checkbox';
import { Radio } from '@repo/ui/components/radio';
import { Spinner } from '@repo/ui/components/spinner';
import { Switch } from '@repo/ui/components/switch';

export function PreviewControls() {
  return (
    <div className="flex items-center justify-between gap-2 px-5">
      <Checkbox defaultChecked className="rounded-md" />
      <Switch defaultChecked />
      <Radio name="demo-radio" />
      <Radio name="demo-radio" defaultChecked />
      <Spinner size="md" variant="primary" />
    </div>
  );
}
