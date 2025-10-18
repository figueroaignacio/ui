'use client';

// Hooks
import { useMounted } from '@/hooks/use-mounted';
import { useTheme } from '@/hooks/use-theme';

// Components
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="bg-muted/30 animate-pulse cursor-default"
      >
        <div className="bg-foreground/20 h-5 w-5 rounded-full" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
