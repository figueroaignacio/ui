import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeColor = 'orange' | 'zinc' | 'green' | 'blue' | 'rose';

interface ThemeState {
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      color: 'orange',
      setColor: (color) => {
        set({ color });
        if (typeof document !== 'undefined') {
          document.documentElement.dataset.themeColor = color;
        }
      },
    }),
    {
      name: 'nach-theme-color',
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.dataset.themeColor = state.color;
        }
      },
    },
  ),
);
