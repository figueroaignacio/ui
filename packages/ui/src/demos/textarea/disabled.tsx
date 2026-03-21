'use client';

import { Textarea } from '../../components/textarea';

export function Disabled() {
  return <Textarea label="Message" placeholder="You cannot type here..." disabled />;
}
