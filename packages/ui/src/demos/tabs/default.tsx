'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/tabs';

export function Default() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-muted-foreground text-sm">
          Make changes to your account here. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-muted-foreground text-sm">
          Change your password here. After saving, you'll be logged out.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences.
        </p>
      </TabsContent>
    </Tabs>
  );
}
