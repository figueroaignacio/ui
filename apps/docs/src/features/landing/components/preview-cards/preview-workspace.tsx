import { Card } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Select } from '@repo/ui/components/select';
import { Switch } from '@repo/ui/components/switch';

export function PreviewWorkspace() {
  return (
    <Card variant="outline">
      <Card.Content compact className="flex flex-col gap-4 pt-4">
        <Input
          label="Workspace Name"
          defaultValue="acme-corp"
          description="This will be your project's unique identifier."
          className="bg-background text-foreground placeholder:text-muted-foreground"
        />

        <div className="block space-y-1">
          <label className="text-foreground text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Environment
          </label>
          <Select className="bg-background text-foreground" defaultValue="production">
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </Select>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-foreground text-sm font-medium">Maintenance Mode</span>
          <Switch defaultChecked />
        </div>

        <div className="space-y-2 pt-4">
          <div className="text-foreground flex justify-between text-xs">
            <span className="font-medium">API Rate Limit</span>
            <span className="font-bold">1,000 / hr</span>
          </div>
          <div className="bg-secondary relative h-2 w-full overflow-hidden rounded-full">
            <div className="bg-primary absolute top-0 left-0 h-full w-[70%] rounded-full" />
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
