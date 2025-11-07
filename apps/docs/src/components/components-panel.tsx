'use client';

import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Copy, MoreHorizontal } from 'lucide-react';

export function ComponentsPanel() {
  const teamMembers = [
    { name: 'Emmeline Labrie', email: 'emmeline.labrie@example.com', avatar: '👩🏻' },
    { name: 'Zac Wight', email: 'zac.wight@example.com', avatar: '👨🏻' },
    { name: 'Poppy Nicholls', email: 'poppy.nicholls@example.com', avatar: '👩🏽' },
    { name: 'Da-Xia Wu', email: 'da-xia.wu@example.com', avatar: '👨🏻' },
    { name: 'Marisa Palermo', email: 'marisa.palermo@example.com', avatar: '👩🏻' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Your team panel */}
      <Card className="bg-card/50 border-border border backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Your team</CardTitle>
          <CardDescription className="text-xs">
            Invite and manage your team members.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="Email address" type="email" className="h-8 text-sm" />
            <Button size="sm" className="h-8 shrink-0">
              Invite
            </Button>
          </div>
          <div className="space-y-2">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg p-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500 text-sm">
                    {member.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{member.name}</span>
                    <span className="text-muted-foreground text-xs">{member.email}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 border-border border backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Sign up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-xs font-medium">
              Email address
            </Label>
            <Input id="signup-email" type="email" placeholder="Enter your email" className="h-9" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="signup-password" className="text-xs font-medium">
                Password
              </Label>
              <button className="text-primary text-xs hover:underline">Forgot password?</button>
            </div>
            <Input
              id="signup-password"
              type="password"
              placeholder="Enter your password"
              className="h-9"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              Create an account
            </Button>
            <Button size="sm" className="flex-1">
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 border-border border backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Your company card</CardTitle>
          <CardDescription className="text-xs">
            View and manage your corporate card.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-purple-500 via-purple-400 to-purple-300 p-4 text-white shadow-lg">
            <div className="space-y-3">
              <div className="text-sm font-medium">Sophie Johnson</div>
              <div className="flex items-center gap-2 font-mono text-sm">
                <span>4829 3849 5027 1846</span>
                <button className="rounded p-1 transition-colors hover:bg-white/20">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <div className="flex gap-4 text-xs">
                <div>
                  <div className="text-purple-100">Expires</div>
                  <div className="font-mono">01/27</div>
                </div>
                <div>
                  <div className="text-purple-100">CVV</div>
                  <div className="font-mono">999</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              Freeze
            </Button>
            <Button variant="default" size="sm" className="flex-1">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 border-border border backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription className="text-xs">Manage your notification settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="mb-2 text-sm font-medium">Comments</div>
              <p className="text-muted-foreground mb-3 text-xs">
                Receive notifications when someone comments on your documents or mentions you.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 bg-transparent text-xs">
                  Push
                </Button>
                <Button variant="outline" size="sm" className="h-7 bg-transparent text-xs">
                  Email
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Slack
                </Button>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">Favorites</div>
              <p className="text-muted-foreground mb-3 text-xs">
                Receive notifications when there is activity related to your favorited items.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 bg-transparent text-xs">
                  Push
                </Button>
                <Button variant="outline" size="sm" className="h-7 bg-transparent text-xs">
                  Email
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Slack
                </Button>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">New documents</div>
              <p className="text-muted-foreground mb-3 text-xs">
                Get notified when new documents are shared with you.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 bg-transparent text-xs">
                  Push
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Email
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Slack
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Invoice paid</div>
            <p className="text-muted-foreground text-xs">
              You paid $17,975.30. A receipt copy was sent to your email.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
