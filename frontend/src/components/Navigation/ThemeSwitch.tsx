import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { RiLightbulbFlashLine, RiLightbulbLine } from 'react-icons/ri';

import { useScreenSize } from '@/hooks/useScreenSize';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

function getSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? Theme.Dark : Theme.Light;
}

function updateTheme(newTheme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove(Theme.Light, Theme.Dark);
  root.classList.add(newTheme);
  localStorage.setItem('theme', newTheme);
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || getSystemTheme();
  });
  const { t } = useTranslation();
  const { isMobile } = useScreenSize();
  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  return (
    <div>
      <Button
        variant="ghost"
        className="flex aspect-square size-fit items-center !bg-transparent !p-0"
        title={t('navigation.tooltips.theme')}
        onClick={() =>
          setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
        }
        size={isMobile ? 'xs' : 'md'}
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
