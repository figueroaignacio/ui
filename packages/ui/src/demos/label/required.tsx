'use client';

import { Input } from '../../components/input';
import { Label } from '../../components/label';

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name-demo" required>
          Full Name
        </Label>
        <Input id="name-demo" placeholder="John Doe" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio-demo" optional description="Tell us about yourself">
          Bio
        </Label>
        <Input id="bio-demo" placeholder="A short bio..." />
      </div>
    </div>
  );
}
