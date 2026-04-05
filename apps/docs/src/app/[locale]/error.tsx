'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md text-center">
        An unexpected error occurred. You can try recovering by clicking the button below.
      </p>
      <button
        onClick={() => reset()}
        className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-4 py-2 font-medium transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
