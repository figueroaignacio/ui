import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-muted-foreground mt-2">Page not found</p>
          <Link href="/" className="bg-primary text-primary-foreground mt-4 rounded-lg px-4 py-2">
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
