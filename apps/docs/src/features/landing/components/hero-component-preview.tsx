'use client';

import {
  CheckmarkBadge01Icon,
  Delete02Icon,
  GlobalIcon,
  Rocket01Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Avatar } from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Select } from '@repo/ui/components/select';
import { Switch } from '@repo/ui/components/switch';

export function HeroComponentPreview() {
  return (
    <div className="mx-auto mt-16 w-full max-w-6xl">
      <div className="border-border bg-background relative overflow-hidden border backdrop-blur-xl">
        <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-3">
          <div className="flex gap-2">
            <div className="bg-destructive size-3 rounded-full" />
            <div className="bg-warning size-3 rounded-full" />
            <div className="bg-success size-3 rounded-full" />
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Forms & Settings */}
          <div className="flex flex-col gap-6">
            <Card variant="outline" className="bg-card backdrop-blur-sm">
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

            <Card variant="outline" className="bg-card backdrop-blur-sm">
              <Card.Content compact className="flex flex-col gap-2 pt-4">
                <div className="text-muted-foreground mb-2 text-xs font-medium">
                  Project Actions
                </div>

                <div className="group hover:bg-secondary flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon
                      icon={UserGroupIcon}
                      size={18}
                      className="text-muted-foreground group-hover:text-foreground"
                    />
                    <div>
                      <div className="text-foreground text-sm">Invite Team</div>
                      <div className="text-muted-foreground text-xs">Add members</div>
                    </div>
                  </div>
                  <div className="border-border text-muted-foreground rounded border px-1.5 py-0.5 text-xs">
                    ⌘I
                  </div>
                </div>

                <div className="group hover:bg-secondary flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon
                      icon={GlobalIcon}
                      size={18}
                      className="text-muted-foreground group-hover:text-foreground"
                    />
                    <div>
                      <div className="text-foreground text-sm">Deployments</div>
                      <div className="text-muted-foreground text-xs">Manage URLs</div>
                    </div>
                  </div>
                  <div className="border-border text-muted-foreground rounded border px-1.5 py-0.5 text-xs">
                    ⌘D
                  </div>
                </div>

                <div className="text-destructive mt-2 mb-1 text-xs font-medium">Danger zone</div>
                <div className="group hover:bg-destructive/10 flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon
                      icon={Delete02Icon}
                      size={18}
                      className="text-destructive group-hover:text-destructive"
                    />
                    <div>
                      <div className="text-destructive text-sm">Delete Project</div>
                      <div className="text-destructive text-xs">Irreversible action</div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-6">
              <Avatar.Group className="mb-2">
                <Avatar>
                  <Avatar.Image src="https://github.com/figueroaignacio.png" />
                  <Avatar.Fallback>A</Avatar.Fallback>
                </Avatar>
                <Avatar>
                  <Avatar.Image src="https://github.com/shadcn.png" />
                  <Avatar.Fallback>B</Avatar.Fallback>
                </Avatar>
                <Avatar>
                  <Avatar.Image src="https://github.com/midudev.png" />
                  <Avatar.Fallback>C</Avatar.Fallback>
                </Avatar>
                <Avatar>
                  <Avatar.Image src="https://github.com/vercel.png" />
                  <Avatar.Fallback>D</Avatar.Fallback>
                </Avatar>
                <Avatar>
                  <Avatar.Fallback>+3</Avatar.Fallback>
                </Avatar>
              </Avatar.Group>

              <div className="w-full space-y-4 px-6 text-left">
                <div>
                  <h3 className="text-foreground text-lg font-bold">MFA Required</h3>
                  <p className="text-muted-foreground text-sm">
                    Enter the 6-digit code from your authenticator app.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input
                    className="bg-background text-foreground h-12 w-12 text-center text-xl font-bold"
                    defaultValue="3"
                  />
                  <Input
                    className="bg-background text-foreground h-12 w-12 text-center text-xl font-bold"
                    defaultValue="8"
                  />
                  <Input
                    className="bg-background text-foreground h-12 w-12 text-center text-xl font-bold"
                    defaultValue="4"
                  />
                  <div className="text-muted-foreground flex items-center">-</div>
                  <Input
                    className="bg-background text-foreground h-12 w-12 text-center text-xl font-bold"
                    defaultValue="1"
                  />
                  <Input
                    className="bg-background text-foreground h-12 w-12 text-center text-xl font-bold"
                    placeholder="0"
                  />
                </div>
                <p className="text-muted-foreground pt-2 text-xs">
                  Lost access to your device?{' '}
                  <span className="text-primary cursor-pointer font-medium hover:underline">
                    Use recovery code
                  </span>
                </p>
              </div>

              <div className="mt-2 grid w-full grid-cols-3 gap-3 px-6">
                <Button variant="default">Action</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
                <Button variant="destructive">Delete</Button>
                <Button
                  variant="outline"
                  className="text-destructive border-destructive/20 hover:bg-destructive/10"
                >
                  Warn
                </Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <Card
              variant="outline"
              className="group bg-card hover:border-primary/50 mt-4 backdrop-blur-sm transition-all"
            >
              <Card.Content compact className="pt-4 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      className="border-border bg-foreground text-background border"
                    >
                      <Avatar.Image src="https://github.com/figueroaignacio.png" />
                    </Avatar>
                    <div>
                      <div className="text-foreground flex items-center gap-1 text-sm font-bold">
                        Ignacio Figueroa
                        <HugeiconsIcon
                          icon={CheckmarkBadge01Icon}
                          size={14}
                          className="text-primary"
                        />
                      </div>
                      <div className="text-muted-foreground text-xs">@nach_ui</div>
                    </div>
                  </div>
                </div>
                <div className="text-foreground mt-3 text-sm font-medium">
                  Building for the future of UI and Frontend Development
                </div>
                <div className="mt-3 flex gap-4 text-xs">
                  <div className="text-muted-foreground">
                    <span className="text-foreground font-bold">140</span> Components
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-foreground font-bold">2.4M</span> Weekly DLs
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Column 3: Cards */}
          <div className="flex flex-col gap-6">
            <Card variant="outline" className="bg-card relative backdrop-blur-sm">
              <Card.Content compact className="space-y-6 pt-6 pb-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="border-primary/20 bg-primary/10 mb-2 flex size-12 items-center justify-center rounded-full border">
                    <HugeiconsIcon icon={Rocket01Icon} className="text-primary" size={24} />
                  </div>
                  <div className="text-center">
                    <h4 className="text-foreground text-lg font-bold">Deploy to Edge</h4>
                    <p className="text-muted-foreground mt-1 text-sm leading-tight text-balance">
                      Push your application globally in seconds.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full">Start Deployment</Button>

                  <div className="relative flex items-center py-2">
                    <div className="border-border grow border-t"></div>
                    <span className="text-muted-foreground mx-4 shrink-0 text-[10px] font-medium uppercase">
                      Or
                    </span>
                    <div className="border-border grow border-t"></div>
                  </div>

                  <Button
                    variant="outline"
                    className="bg-secondary text-secondary-foreground w-full"
                  >
                    Deploy via CLI
                  </Button>
                </div>
              </Card.Content>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card variant="outline" className="bg-card backdrop-blur-sm">
                <Card.Content compact className="pt-4 pb-4">
                  <div className="border-success/30 bg-success/20 text-success mb-3 flex size-8 items-center justify-center rounded-lg border font-bold">
                    FE
                  </div>
                  <div className="text-foreground text-sm font-bold">Frontend Core</div>
                  <div className="text-muted-foreground mb-3 text-xs">82 engineers</div>
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Avatar size="sm">
                      <Avatar.Fallback>JD</Avatar.Fallback>
                    </Avatar>
                    Lead
                  </div>
                </Card.Content>
              </Card>
              <Card variant="outline" className="bg-card backdrop-blur-sm">
                <Card.Content compact className="pt-4 pb-4">
                  <div className="border-info/30 bg-info/20 text-info mb-3 flex size-8 items-center justify-center rounded-lg border font-bold">
                    UX
                  </div>
                  <div className="text-foreground text-sm font-bold">Design Systems</div>
                  <div className="text-muted-foreground mb-3 text-xs">24 designers</div>
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Avatar size="sm">
                      <Avatar.Fallback>MA</Avatar.Fallback>
                    </Avatar>{' '}
                    Lead
                  </div>
                </Card.Content>
              </Card>
            </div>

            <Card
              variant="outline"
              className="border-destructive/20 bg-destructive/5 relative backdrop-blur-sm"
            >
              <Card.Content compact className="pt-5 pb-5">
                <div className="bg-destructive/20 text-destructive mb-3 flex size-8 items-center justify-center rounded-full">
                  <span className="font-bold">!</span>
                </div>
                <h4 className="text-foreground text-sm font-bold">Unsaved Schema Changes</h4>
                <p className="text-muted-foreground mt-1 mb-4 text-xs">
                  These database migrations have not been applied yet.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-background text-foreground flex-1"
                  >
                    Review
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    Force Apply
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
