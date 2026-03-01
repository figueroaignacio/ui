'use client';

import { useMounted } from '@/hooks/use-mounted';
import { MoonIcon, SunIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { useTheme } from 'nach-themes';

export function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="bg-muted/30 animate-pulse cursor-default"
      >
        <div className="bg-foreground/20 h-5 w-5 rounded-full" />
      </Button>
    );
  }

  const isDark = theme === 'dark';
  const Icon = isDark ? MoonIcon : SunIcon;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="h-8 w-8"
    >
      <HugeiconsIcon icon={Icon} size={16} />
    </Button>
  );
}
