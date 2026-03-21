'use client';

import { Skeleton } from '../../components/skeleton';

export function Card() {
  return (
    <div className="border-border w-full max-w-sm space-y-4 rounded-xl border p-6">
      <Skeleton className="h-[140px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </div>
  );
}
