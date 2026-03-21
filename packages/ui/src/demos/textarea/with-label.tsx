'use client';

import { Textarea } from '../../components/textarea';

export function WithLabel() {
  return (
    <Textarea
      label="Bio"
      description="Tell us a little about yourself."
      placeholder="I'm a software engineer who loves..."
    />
  );
}
