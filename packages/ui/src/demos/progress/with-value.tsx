'use client';

import * as React from 'react';
import { Progress } from '../../components/progress';

export function WithValue() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-[60%] flex-col gap-2">
      <div className="flex justify-between text-sm font-medium">
        <span>Downloading...</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
