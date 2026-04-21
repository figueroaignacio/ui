import { Badge } from '@repo/ui/components/badge';
import { Card } from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Label } from '@repo/ui/components/label';
import { Radio } from '@repo/ui/components/radio';
import { Spinner } from '@repo/ui/components/spinner';
import { Switch } from '@repo/ui/components/switch';

export function PreviewControls() {
  return (
    <Card variant="outline">
      <Card.Content compact className="space-y-4 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms" className="text-xs">
              Agree to terms
            </Label>
          </div>
          <Badge variant="outline" className="h-4 text-[10px]">
            REQUIRED
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs">Auto-save changes</Label>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Radio name="plan" id="free" value="free" />
            <Label htmlFor="free" className="text-xs">
              Free
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio name="plan" id="pro" value="pro" defaultChecked />
            <Label htmlFor="pro" className="text-xs">
              Pro
            </Label>
          </div>
          <div className="ml-auto">
            <Spinner size="sm" />
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
