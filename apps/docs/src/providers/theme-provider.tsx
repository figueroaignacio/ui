'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme. Default: 'dark' */
  defaultTheme?: Theme;
  /** localStorage key. Default: 'theme' */
  storageKey?: string;
  /** HTML attribute to use. Default: 'class' */
  attribute?: 'class' | 'data-theme';
  /** Disable transitions on theme change. Default: true */
  disableTransitionOnChange?: boolean;
  /** Force theme (ignores localStorage). Default: undefined */
  forcedTheme?: Theme;
  /** Enable cookie storage for SSR (Next.js). Default: false */
  enableCookieStorage?: boolean;
  /** Cookie name for SSR. Default: 'theme' */
  cookieName?: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme | undefined;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
};

const getStoredTheme = (key: string, defaultTheme: Theme): Theme => {
  if (typeof window === 'undefined') return defaultTheme;

  try {
    const stored = localStorage.getItem(key) as Theme;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch (e) {
    console.warn('Failed to read theme from localStorage:', e);
  }

  return defaultTheme;
};

const setCookie = (name: string, value: string): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`;
};

const applyTheme = (
  theme: ResolvedTheme,
  attribute: 'class' | 'data-theme',
  disableTransition: boolean,
): void => {
  if (typeof document === 'undefined') return;

  const html = document.documentElement;

  // Temporarily disable transitions
  if (disableTransition) {
    const css = document.createElement('style');
    css.appendChild(
      document.createTextNode(
        '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}',
      ),
    );
    document.head.appendChild(css);

    // Force reflow
    (() => window.getComputedStyle(document.body))();

    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  }

  if (attribute === 'class') {
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  } else {
    html.setAttribute('data-theme', theme);
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'theme',
  attribute = 'class',
  disableTransitionOnChange = true,
  forcedTheme,
  enableCookieStorage = false,
  cookieName = 'theme',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (forcedTheme) return forcedTheme;
    if (typeof window === 'undefined') return defaultTheme;
    return getStoredTheme(storageKey, defaultTheme);
  });

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    return getSystemTheme();
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const current = forcedTheme || getStoredTheme(storageKey, defaultTheme);
    return current === 'system' ? getSystemTheme() : current;
  });

  // Listen for changes to the system theme
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(MEDIA_QUERY);

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);

      if (theme === 'system') {
        setResolvedTheme(newSystemTheme);
        applyTheme(newSystemTheme, attribute, disableTransitionOnChange);
        if (enableCookieStorage) {
          setCookie(cookieName, newSystemTheme);
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, attribute, disableTransitionOnChange, enableCookieStorage, cookieName]);

  // Apply theme on initial mount (for Next.js SSR)
  useEffect(() => {
    const current = forcedTheme || theme;
    const resolved = current === 'system' ? systemTheme || getSystemTheme() : current;

    setResolvedTheme(resolved);
    applyTheme(resolved, attribute, false);

    // Save a cookie on the first render
    if (enableCookieStorage) {
      setCookie(cookieName, resolved);
    }
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (forcedTheme) return;

      setThemeState(newTheme);

      const resolved = newTheme === 'system' ? systemTheme || getSystemTheme() : newTheme;
      setResolvedTheme(resolved);
      applyTheme(resolved, attribute, disableTransitionOnChange);

      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        console.warn('Failed to save theme to localStorage:', e);
      }

      // Store cookie for SSR
      if (enableCookieStorage) {
        setCookie(cookieName, resolved);
      }
    },
    [
      forcedTheme,
      systemTheme,
      storageKey,
      attribute,
      disableTransitionOnChange,
      enableCookieStorage,
      cookieName,
    ],
  );

  const value: ThemeContextType = {
    theme: forcedTheme || theme,
    setTheme,
    resolvedTheme,
    systemTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
