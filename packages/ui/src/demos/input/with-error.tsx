'use client';

import { Input } from '../../components/input';

export function WithError() {
  return (
    <Input
      label="Email"
      placeholder="you@example.com"
      type="email"
      error="Please enter a valid email address"
      defaultValue="invalid-email"
    />
  );
}
