'use client';

import { Avatar } from '../../components/avatar';

export function AvatarGroup() {
  return (
    <Avatar.Group>
      <Avatar>
        <Avatar.Image src="https://github.com/figueroaignacio.png" alt="@figueroaignacio" />
        <Avatar.Fallback>FI</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image src="https://github.com/nicvazquezdev.png" alt="@nicvazquezdev" />
        <Avatar.Fallback>NV</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image src="https://github.com/ManuZarraga.png" alt="@ManuZarraga" />
        <Avatar.Fallback>MZ</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback className="bg-muted text-muted-foreground">+3</Avatar.Fallback>
      </Avatar>
    </Avatar.Group>
  );
}
