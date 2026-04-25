'use client';

import { useThemeStore } from '@/hooks/use-theme-store';
import { cn } from '@repo/ui/lib/cn';
import { useEffect, useState } from 'react';

const THEMES = [
  { name: 'orange', hex: '#f97316' },
  { name: 'zinc', hex: '#71717a' },
  { name: 'green', hex: '#22c55e' },
  { name: 'blue', hex: '#3b82f6' },
  { name: 'rose', hex: '#f43f5e' },
] as const;

export function ThemeColorSwitcher() {
  const { color, setColor } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-2.5">
        {THEMES.map((c) => (
          <div key={c.name} className="bg-muted h-5 w-5 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      {THEMES.map((c) => (
        <button
          key={c.name}
          onClick={() => setColor(c.name)}
          aria-label={`Switch to ${c.name} theme`}
          className={cn(
            'focus-visible:ring-offset-background h-5 w-5 rounded-full transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            color === c.name
              ? 'ring-foreground ring-offset-background scale-125 ring-2 ring-offset-2'
              : 'opacity-80',
          )}
          style={{ backgroundColor: c.hex }}
        />
      ))}
    </div>
  );
}
