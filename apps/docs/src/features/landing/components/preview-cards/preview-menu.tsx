import { CreditCardIcon, Logout01Icon, Settings02Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { DropdownMenu } from '@repo/ui/components/dropdown-menu';
import { Separator } from '@repo/ui/components/separator';

export function PreviewMenu() {
  return (
    <Card variant="default">
      <Card.Content compact className="flex flex-col gap-3 pt-4">
        <div className="text-muted-foreground text-xs font-medium">Quick Actions</div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Account Settings</span>
            <span className="text-muted-foreground text-[11px]">Manage your profile</span>
          </div>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 border-dashed p-0">
                <HugeiconsIcon icon={Settings02Icon} size={14} />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end" className="w-48">
              <DropdownMenu.Label>My Account</DropdownMenu.Label>
              <DropdownMenu.Item className="gap-2">
                <HugeiconsIcon icon={UserIcon} size={14} />
                <span>Profile</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="gap-2">
                <HugeiconsIcon icon={CreditCardIcon} size={14} />
                <span>Billing</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item variant="destructive" className="gap-2">
                <HugeiconsIcon icon={Logout01Icon} size={14} />
                <span>Logout</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <Separator label="or" />
        <Button variant="secondary" size="sm" className="w-full text-xs">
          View all activity
        </Button>
      </Card.Content>
    </Card>
  );
}
