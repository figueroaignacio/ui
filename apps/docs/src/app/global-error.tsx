'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-2 text-3xl font-bold">Critical Application Error</h2>
          <p className="mb-6 text-gray-600">
            A critical error occurred that could not be handled gracefully.
          </p>
          <button
            onClick={() => reset()}
            className="rounded bg-black px-6 py-2 font-medium text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
