import { Theme, useTheme } from '@/providers/ThemeProvider';
import { Button } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { RiLightbulbFlashLine, RiLightbulbLine } from 'react-icons/ri';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div>
      <Button
        variant="soft"
        className="flex aspect-square size-fit items-center !bg-transparent !p-0"
        title={t('navigation.tooltips.theme')}
        onClick={() =>
          toggleTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
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
