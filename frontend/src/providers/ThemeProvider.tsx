import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  function getSystemTheme() {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDark ? Theme.Dark : Theme.Light;
  }

  function updateTheme(newTheme: Theme) {
    const root = window.document.documentElement;
    root.classList.remove(Theme.Light, Theme.Dark);
    root.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || getSystemTheme();
  });

  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  const toggleTheme = (theme: Theme) => {
    setTheme(theme);
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
