'use client';

import { Textarea } from '../../components/textarea';

export function AutoResize() {
  return (
    <Textarea
      label="Comment"
      placeholder="Start typing and the textarea will grow..."
      autoResize
    />
  );
}
