import { useEffect, useState } from 'react';
import { Stats } from '@/interfaces/index';
import { useCurrencyStore } from '@/store/currencyStore';
import { useLangStore } from '@/store/languageStore';
import { Theme, useThemeStore } from '@/store/themeStore';
import { Button, Popover, Spinner } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { BsGithub } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { IoLanguageOutline } from 'react-icons/io5';
import { RiLightbulbFlashLine, RiLightbulbLine } from 'react-icons/ri';

import { CurrencyIcons } from '@/config/currencies';
import { Language, LanguageTitle } from '@/config/languages';

interface NavigationProps {
  stats?: Stats;
}

function Navigation({ stats }: NavigationProps) {
  const { t } = useTranslation();
  const [scrollTop, setScrollTop] = useState(true);
  const { setTheme, theme } = useThemeStore();
  const { setLang, lang, languages } = useLangStore();
  const { setSelectedCurrency, selectedCurrency, currencies } =
    useCurrencyStore();

  useEffect(() => {
    const scrollHandler = () => {
      setScrollTop(window.scrollY <= 10);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  function openRepo() {
    window.open('https://github.com/llmgcc/keyskill-statistics', '_blank');
  }

  return (
    <>
      <div className="">
        <div className="border-b-[1px] border-background-secondary">
          <div className="app-container flex h-2 items-center justify-between py-4 text-xs text-text-secondary">
            <div className="flex">
              <div className="text-xs">
                <span>{t('navigation.uniqueSkills')}:</span>{' '}
                <span className="font-[600] text-background-accent">
                  {stats?.unique_skills ?? null}
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs">
                <span>{t('navigation.lastUpdate')}:</span>{' '}
                <span className="font-[600] text-background-accent">
                  {stats?.last_update ?? null}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-50 border-b-[1px] border-background-secondary bg-background-primary">
        <div
          className={`app-container flex h-12 w-full items-center justify-between py-4 ${!scrollTop && 'shadow-sm'}`}
        >
          <div className="flex items-center justify-center text-sm">
            <div className="flex items-center text-text">
              <div className="flex size-5 items-center justify-center rounded">
                <div>
                  <div className="mb-[1px] flex">
                    <div className="mr-[1px] size-2 rounded-sm bg-background-accent/25"></div>
                    <div className="size-2 rounded-sm bg-background-accent/50"></div>
                  </div>
                  <div className="flex">
                    <div className="mr-[1px] size-2 rounded-sm bg-background-accent/75"></div>
                    <div className="size-2 rounded-sm bg-background-accent/100"></div>
                  </div>
                </div>
              </div>
              <div className="h-100 font-sm text-md mx-1 flex cursor-pointer items-center justify-center font-bold uppercase text-text transition-colors duration-150 hover:text-background-accent">
                Keystats
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mx-2">
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
            <div className="mx-2 flex items-center">
              <Popover.Root>
                <Popover.Trigger>
                  <Button
                    variant="soft"
                    className="ml-1 flex aspect-square size-fit items-center !bg-transparent !p-0"
                    title={t('navigation.tooltips.currency')}
                  >
                    {currencies.length && selectedCurrency !== null ? (
                      <div className="cursor-pointer text-xl font-[900] text-text transition-colors duration-150 hover:text-background-accent">
                        {CurrencyIcons[selectedCurrency.currency_code]}
                      </div>
                    ) : (
                      <Spinner loading />
                    )}
                  </Button>
                </Popover.Trigger>
                <Popover.Content className="min-w-max rounded-md border-[1px] border-background-secondary bg-background-primary !p-2 shadow-background-secondary">
                  <div className="min-w-44">
                    {currencies.map((c) => (
                      <div
                        className={`flex min-w-max cursor-pointer items-center justify-between rounded px-2 py-3 hover:text-background-accent ${selectedCurrency?.currency_code === c.currency_code ? 'bg-background-secondary' : ''}`}
                        key={c.currency_code}
                        onClick={() => setSelectedCurrency(c.currency_code)}
                      >
                        <div className="flex">
                          <div className="mr-2 text-sm font-[500] text-text-secondary">
                            {c.currency_code}
                          </div>
                          <div className="text-sm font-[500]">
                            {t(`currency.${c.currency_code}`)}
                          </div>
                        </div>
                        <div className="ml-4 text-xs text-green-400">
                          {selectedCurrency?.currency_code ==
                          c.currency_code ? (
                            <FaCheck />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
            <div className="mx-2 flex items-center">
              <Popover.Root>
                <Popover.Trigger>
                  <Button
                    variant="soft"
                    className="ml-1 flex aspect-square size-fit items-center !bg-transparent !p-0"
                    title={t('navigation.tooltips.language')}
                  >
                    <IoLanguageOutline className="cursor-pointer text-2xl text-red-400 text-text hover:text-background-accent"></IoLanguageOutline>
                  </Button>
                </Popover.Trigger>
                <Popover.Content className="min-w-max rounded-md border-[1px] border-background-secondary bg-background-primary !p-2 shadow-background-secondary">
                  <div className="min-w-36">
                    {languages.map((c) => (
                      <div
                        className={`flex min-w-max cursor-pointer items-center justify-between rounded px-2 py-3 hover:text-background-accent ${c == lang ? 'bg-background-secondary' : ''}`}
                        key={c}
                        onClick={() => setLang(c as Language)}
                      >
                        <div className="flex">
                          <div className="mr-2 text-sm font-[500] text-text-secondary">
                            {c.toUpperCase()}
                          </div>
                          <div className="text-sm font-[500]">
                            {LanguageTitle[c as Language]}
                          </div>
                        </div>
                        <div className="ml-4 text-xs text-green-400">
                          {c == lang ? <FaCheck /> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
            <div className="ml-2 flex items-center">
              <Button
                variant="soft"
                className="ml-1 aspect-square size-fit !bg-transparent !p-0"
                title="Github"
                onClick={openRepo}
              >
                <BsGithub className="cursor-pointer text-xl text-text transition-colors duration-150 hover:text-background-accent" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
