import { Button } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import { IoLanguageOutline } from 'react-icons/io5';

import { Language, LanguageTitle } from '@/config/languages';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/AppPopover';

export function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const languages = Object.keys(Language);
  const setLang = (language: Language) => i18n.changeLanguage(language);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="soft"
          className="ml-1 flex aspect-square size-fit items-center !bg-transparent !p-0"
          title={t('navigation.tooltips.language')}
        >
          <IoLanguageOutline className="cursor-pointer text-2xl text-red-400 text-text hover:text-background-accent"></IoLanguageOutline>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="min-w-36 p-2">
          {languages.map((currentLanguage) => (
            <div
              className={`flex min-w-max cursor-pointer items-center justify-between rounded px-2 py-3 hover:text-background-accent ${currentLanguage == selectedLanguage ? 'bg-background-secondary' : ''}`}
              key={currentLanguage}
              onClick={() => setLang(currentLanguage as Language)}
            >
              <div className="flex">
                <div className="mr-2 text-sm font-[500] text-text-secondary">
                  {currentLanguage.toUpperCase()}
                </div>
                <div className="text-sm font-[500]">
                  {LanguageTitle[currentLanguage as Language]}
                </div>
              </div>
              <div className="ml-4 text-xs text-green-400">
                {currentLanguage == selectedLanguage ? <FaCheck /> : null}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
