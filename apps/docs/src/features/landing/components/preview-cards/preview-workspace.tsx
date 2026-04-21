import { Card } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Progress } from '@repo/ui/components/progress';
import { Select } from '@repo/ui/components/select';
import { Switch } from '@repo/ui/components/switch';

export function PreviewWorkspace() {
  return (
    <Card variant="outline">
      <Card.Content compact className="flex flex-col gap-5 pt-5 pb-5">
        <Input
          label="Workspace Name"
          defaultValue="acme-corp"
          description="This will be your project's unique identifier."
        />

        <div className="space-y-1.5">
          <Label>Environment</Label>
          <Select defaultValue="production">
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-xs">Maintenance Mode</Label>
            <p className="text-muted-foreground text-[10px]">Disable public access</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="space-y-2 pt-2">
          <div className="text-foreground flex justify-between text-[10px] font-bold tracking-widest uppercase">
            <span className="text-muted-foreground">API Rate Limit</span>
            <span>70%</span>
          </div>
          <Progress value={70} />
          <p className="text-muted-foreground text-right text-[10px]">700 / 1,000 hr</p>
        </div>
      </Card.Content>
    </Card>
  );
}
