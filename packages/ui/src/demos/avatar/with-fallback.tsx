'use client';

import { Avatar } from '../../components/avatar';

export function WithFallback() {
  return (
    <div className="flex gap-4">
      {/* Broken image link to test fallback */}
      <Avatar>
        <Avatar.Image src="https://github.com/figueroaignacio.pn" alt="@figueroaignacio" />
        <Avatar.Fallback>FI</Avatar.Fallback>
      </Avatar>

      {/* No image provided to test fallback */}
      <Avatar>
        <Avatar.Fallback className="bg-primary text-primary-foreground">FI</Avatar.Fallback>
      </Avatar>
    </div>
  );
}
