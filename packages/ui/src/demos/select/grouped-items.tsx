'use client';

import { Select } from '../../components/select';

export function GroupedItems() {
  return (
    <div className="w-full max-w-xs">
      <Select defaultValue="" aria-label="Select a fruit">
        <option value="" disabled>
          Select a fruit
        </option>
        <optgroup label="Citrus">
          <option value="orange">Orange</option>
          <option value="lemon">Lemon</option>
          <option value="lime">Lime</option>
        </optgroup>
        <optgroup label="Berries">
          <option value="strawberry">Strawberry</option>
          <option value="blueberry">Blueberry</option>
          <option value="raspberry">Raspberry</option>
        </optgroup>
      </Select>
    </div>
  );
}
