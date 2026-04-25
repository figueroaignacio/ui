'use client';

import { Button } from '../../../../components/button';
import { Card } from '../../../../components/card';
import { Drawer } from '../../../../components/drawer';
import { Label } from '../../../../components/label';
import { Select } from '../../../../components/select';
import { Switch } from '../../../../components/switch';

export function Settings02() {
  return (
    <div className="w-full">
      <Card className="mx-auto w-full max-w-3xl">
        <Card.Header>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Card.Title>Notifications</Card.Title>
              <Card.Description>Control what you get, where you get it.</Card.Description>
            </div>
            <Drawer>
              <Drawer.Trigger variant="outline" size="sm">
                Advanced
              </Drawer.Trigger>
              <Drawer.Content side="right">
                <Drawer.Header>
                  <Drawer.Title>Advanced settings</Drawer.Title>
                  <Drawer.Description>Fine tune delivery and quiet hours.</Drawer.Description>
                </Drawer.Header>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="settings-02-digest">Digest frequency</Label>
                    <Select id="settings-02-digest" defaultValue="weekly">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </Select>
                  </div>

                  <div className="border-border flex items-center justify-between rounded-xl border p-4">
                    <div className="space-y-0.5">
                      <p className="text-foreground text-sm font-medium">Quiet hours</p>
                      <p className="text-muted-foreground text-xs">Mute notifications overnight.</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Drawer.Close>
                      <Button variant="secondary">Cancel</Button>
                    </Drawer.Close>
                    <Drawer.Close>
                      <Button>Save</Button>
                    </Drawer.Close>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3">
            <div className="border-border flex items-center justify-between rounded-xl border p-4">
              <div className="space-y-0.5">
                <p className="text-foreground text-sm font-medium">Product updates</p>
                <p className="text-muted-foreground text-xs">
                  New components, bricks, and releases.
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="border-border flex items-center justify-between rounded-xl border p-4">
              <div className="space-y-0.5">
                <p className="text-foreground text-sm font-medium">Security alerts</p>
                <p className="text-muted-foreground text-xs">
                  Important account and access changes.
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="border-border flex items-center justify-between rounded-xl border p-4">
              <div className="space-y-0.5">
                <p className="text-foreground text-sm font-medium">Mentions</p>
                <p className="text-muted-foreground text-xs">
                  When someone mentions you in a thread.
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card.Content>
        <Card.Footer align="end">
          <Button>Save preferences</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
