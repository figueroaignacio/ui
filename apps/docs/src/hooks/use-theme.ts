import { use } from 'react';
import { ThemeProviderContext } from '../contexts/theme-context';

export const useTheme = () => {
  const context = use(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
