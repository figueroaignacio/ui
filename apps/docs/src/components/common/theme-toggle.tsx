'use client';

import { useMounted } from '@/hooks/use-mounted';
import { useTheme } from 'i7a-themes';

// Components
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';

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
      <Icon className="h-5 w-5" />
    </Button>
  );
}
