'use client';

import { Input } from '../../components/input';
import { Label } from '../../components/label';

export function Default() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email-demo">Email</Label>
      <Input id="email-demo" placeholder="you@example.com" type="email" />
    </div>
  );
}
