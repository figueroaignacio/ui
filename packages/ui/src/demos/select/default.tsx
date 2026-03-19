'use client';

import { Select } from '../../components/select';

export function Default() {
  return (
    <div className="w-full max-w-xs">
      <Select defaultValue="" aria-label="Select an option">
        <option value="" disabled>
          Select an option
        </option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
    </div>
  );
}
