import { Avatar } from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';

export function PreviewMfa() {
  return (
    <Card variant="outline">
      <Card.Content compact className="flex flex-col items-center gap-6 pt-6 pb-6">
        <div className="flex flex-col items-center gap-2">
          <Avatar.Group>
            <Avatar className="ring-background ring-2">
              <Avatar.Image src="https://github.com/figueroaignacio.png" alt="@figueroaignacio" />
              <Avatar.Fallback>FI</Avatar.Fallback>
            </Avatar>
            <Avatar className="ring-background ring-2">
              <Avatar.Image src="https://github.com/nicvazquezdev.png" alt="@nicvazquezdev" />
              <Avatar.Fallback>NV</Avatar.Fallback>
            </Avatar>
            <Avatar className="ring-background ring-2">
              <Avatar.Image src="https://github.com/ManuZarraga.png" alt="@ManuZarraga" />
              <Avatar.Fallback>MZ</Avatar.Fallback>
            </Avatar>
            <Avatar className="ring-background ring-2">
              <Avatar.Fallback>+3</Avatar.Fallback>
            </Avatar>
          </Avatar.Group>
        </div>

        <div className="flex w-full flex-col items-center space-y-4 text-center">
          <div className="space-y-1">
            <h3 className="text-foreground text-sm font-bold tracking-tight uppercase">
              MFA Required
            </h3>
            <p className="text-muted-foreground text-[10px]">
              Enter the 6-digit code from your authenticator app.
            </p>
          </div>
          <div className="flex justify-center gap-2">
            {[3, 8, 4, 1, 0, 0].map((v, i) => (
              <Input
                key={i}
                className="bg-muted/50 text-foreground h-9 w-8 px-0 text-center text-sm font-bold"
                defaultValue={v.toString()}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-[10px]">
            Lost access?{' '}
            <span className="text-foreground cursor-pointer font-bold underline underline-offset-2">
              Use recovery code
            </span>
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-2">
          <Button variant="default" size="sm" className="h-8 text-[11px] font-bold uppercase">
            Verify
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold uppercase">
            Cancel
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
