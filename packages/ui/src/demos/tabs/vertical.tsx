'use client';

import { Card } from '../../components/card';
import { Tabs } from '../../components/tabs';

export function Vertical() {
  return (
    <Tabs defaultValue="account" className="flex flex-col gap-4 sm:flex-row">
      <Tabs.List className="flex h-auto w-full flex-col justify-start sm:w-48">
        <Tabs.Trigger value="account" className="w-full justify-start">
          Account
        </Tabs.Trigger>
        <Tabs.Trigger value="password" className="w-full justify-start">
          Password
        </Tabs.Trigger>
        <Tabs.Trigger value="notifications" className="w-full justify-start">
          Notifications
        </Tabs.Trigger>
      </Tabs.List>
      <div className="flex-1">
        <Tabs.Content value="account" className="mt-0">
          <Card>
            <Card.Header>
              <Card.Title>Account Settings</Card.Title>
              <Card.Description>Manage your account settings here.</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  This is the account settings tab content.
                </p>
              </div>
            </Card.Content>
          </Card>
        </Tabs.Content>
        <Tabs.Content value="password" className="mt-0">
          <Card>
            <Card.Header>
              <Card.Title>Password</Card.Title>
              <Card.Description>Change your password here.</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">This is the password tab content.</p>
              </div>
            </Card.Content>
          </Card>
        </Tabs.Content>
        <Tabs.Content value="notifications" className="mt-0">
          <Card>
            <Card.Header>
              <Card.Title>Notifications</Card.Title>
              <Card.Description>Manage your notification preferences.</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  This is the notifications tab content.
                </p>
              </div>
            </Card.Content>
          </Card>
        </Tabs.Content>
      </div>
    </Tabs>
  );
}
