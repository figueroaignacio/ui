'use client';

import { Button } from '../../../../components/button';
import { Card } from '../../../../components/card';
import { Checkbox } from '../../../../components/checkbox';
import { Input } from '../../../../components/input';
import { Label } from '../../../../components/label';
import { Select } from '../../../../components/select';
import { Switch } from '../../../../components/switch';
import { Tabs } from '../../../../components/tabs';

export function Settings01() {
  return (
    <div className="w-full">
      <Card className="mx-auto w-full max-w-4xl">
        <Card.Header>
          <Card.Title>Settings</Card.Title>
          <Card.Description>
            Manage your profile, security, and billing preferences.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Tabs defaultValue="profile" variant="underline" className="space-y-4">
            <Tabs.List>
              <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
              <Tabs.Trigger value="security">Security</Tabs.Trigger>
              <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="profile" className="mt-0">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" placeholder="Ignacio Figueroa" autoComplete="name" />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="me@example.com"
                    autoComplete="email"
                  />
                </div>
                <Input label="Company" placeholder="NachUI" autoComplete="organization" />
                <div className="border-border flex items-center justify-between rounded-xl border p-4">
                  <div className="space-y-0.5">
                    <p className="text-foreground text-sm font-medium">Public profile</p>
                    <p className="text-muted-foreground text-xs">
                      Show your name and avatar on public bricks.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </Tabs.Content>

            <Tabs.Content value="security" className="mt-0">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Current password" type="password" autoComplete="current-password" />
                  <Input label="New password" type="password" autoComplete="new-password" />
                </div>
                <div className="border-border flex items-center justify-between rounded-xl border p-4">
                  <div className="space-y-0.5">
                    <p className="text-foreground text-sm font-medium">Two-factor authentication</p>
                    <p className="text-muted-foreground text-xs">Add an extra layer of security.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="settings-01-logout" defaultChecked />
                  <div className="space-y-0.5">
                    <Label htmlFor="settings-01-logout" className="text-sm">
                      Log out of other sessions
                    </Label>
                    <p className="text-muted-foreground text-xs">
                      Recommended after changing your password.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Update security</Button>
                </div>
              </form>
            </Tabs.Content>

            <Tabs.Content value="billing" className="mt-0">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="settings-01-plan">Plan</Label>
                  <Select id="settings-01-plan" defaultValue="pro">
                    <option value="starter">Starter</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </Select>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="settings-01-invoices" defaultChecked />
                  <div className="space-y-0.5">
                    <Label htmlFor="settings-01-invoices" className="text-sm">
                      Email invoices
                    </Label>
                    <p className="text-muted-foreground text-xs">
                      Receive invoices and receipts in your inbox.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save billing</Button>
                </div>
              </form>
            </Tabs.Content>
          </Tabs>
        </Card.Content>
      </Card>
    </div>
  );
}
