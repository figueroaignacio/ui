'use client';

import { Avatar } from '../../components/avatar';

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <Avatar.Image src="https://github.com/figueroaignacio.png" alt="@figueroaignacio" />
        <Avatar.Fallback>FI</Avatar.Fallback>
      </Avatar>

      <Avatar size="md">
        <Avatar.Image src="https://github.com/figueroaignacio.png" alt="@figueroaignacio" />
        <Avatar.Fallback>FI</Avatar.Fallback>
      </Avatar>

      <Avatar size="lg">
        <Avatar.Image src="https://github.com/figueroaignacio.png" alt="@figueroaignacio" />
        <Avatar.Fallback>US</Avatar.Fallback>
      </Avatar>
    </div>
  );
}
