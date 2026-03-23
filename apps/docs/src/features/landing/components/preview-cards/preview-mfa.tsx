import { Avatar } from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';

export function PreviewMfa() {
  return (
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
        <Button variant="link">Link</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  );
}
