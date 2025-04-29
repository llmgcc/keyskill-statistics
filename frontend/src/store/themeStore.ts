import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

type ThemeStore = {
  theme: Theme | null;
  setTheme: (theme?: Theme) => void;
};

function updateTheme(currentTheme: Theme | null, newTheme: Theme) {
  const next = newTheme;
  const root = window.document.documentElement;
  if (currentTheme) {
    root.classList.remove(currentTheme);
  }
  root.classList.add(next);
}

function getSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? Theme.Dark : Theme.Light;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: null,
      setTheme: (theme?: Theme) => {
        const currentTheme = get().theme;
        if (theme) {
          const newTheme = theme;
          updateTheme(currentTheme, theme);
          set({ theme: newTheme });
        } else {
          const newTheme = getSystemTheme();
          updateTheme(currentTheme, newTheme);
          set({ theme: newTheme });
        }
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          updateTheme(null, state.theme);
        } else if (state) {
          const systemTheme = getSystemTheme();
          updateTheme(null, systemTheme);
          state.theme = systemTheme;
        }
      },
    },
  ),
);
