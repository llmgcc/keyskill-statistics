import { useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { RiLightbulbFlashLine, RiLightbulbLine } from 'react-icons/ri';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || getSystemTheme();
  });
  const { t } = useTranslation();

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

  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  return (
    <div>
      <Button
        variant="soft"
        className="flex aspect-square size-fit items-center !bg-transparent !p-0"
        title={t('navigation.tooltips.theme')}
        onClick={() =>
          setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
        }
      >
        {theme === Theme.Light ? (
          <RiLightbulbFlashLine className="cursor-pointer text-xl text-text transition-colors duration-150 hover:text-background-accent" />
        ) : (
          <RiLightbulbLine className="cursor-pointer text-xl text-text transition-colors duration-150 hover:text-background-accent" />
        )}
      </Button>
    </div>
  );
}
