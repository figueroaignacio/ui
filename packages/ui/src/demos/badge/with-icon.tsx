'use client';

import { Configuration01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '../../components/badge';

export function WithIcon() {
  return (
    <Badge className="gap-1">
      <HugeiconsIcon icon={Configuration01Icon} className="h-3 w-3" size={12} />
      Settings
    </Badge>
  );
}
