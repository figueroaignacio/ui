'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/card';

export function CardClickableDemo() {
  const handleClick = (title: string) => {
    alert(`You clicked: ${title}`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card clickable onClick={() => handleClick('Settings')} className="w-full">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Click to open settings panel</p>
        </CardContent>
      </Card>
      <Card clickable onClick={() => handleClick('Profile')} className="w-full">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>View your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Click to view your profile</p>
        </CardContent>
      </Card>
      <Card clickable onClick={() => handleClick('Notifications')} className="w-full md:col-span-2">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Check your updates</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Click to see notifications</p>
        </CardContent>
      </Card>
    </div>
  );
}
