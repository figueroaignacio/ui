'use client';

import { Avatar } from '../../components/avatar';

export function Default() {
  return (
    <Avatar>
      <Avatar.Image src="https://github.com/figueroaignacio.png" alt="@figueroaignacio" />
      <Avatar.Fallback>US</Avatar.Fallback>
    </Avatar>
  );
}
