'use client';

import { Search01Icon, ViewIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Input } from '../../components/input';

export function WithIcon() {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Search..." leftIcon={<HugeiconsIcon icon={Search01Icon} size={16} />} />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        rightIcon={<HugeiconsIcon icon={ViewIcon} size={16} />}
      />
    </div>
  );
}
