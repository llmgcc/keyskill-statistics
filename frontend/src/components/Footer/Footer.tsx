import { Badge, Button, Separator } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import { Language, LanguageTitle } from '@/config/languages';
import { useCurrencyStore } from '@/store/currencyStore';

import { APP_NAME, Logo } from '../Navigation/Logo';
import { AppSelect } from '../ui/AppSelect';

interface FooterLink {
  id: string;
  href: string;
  blank?: boolean;
}

interface FooterColumn {
  id: string;
  links: FooterLink[];
}

export function Footer() {
  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;
  const languages = Object.keys(Language);

  const [selectedCurrency, currencies, setSelectedCurrency] = useCurrencyStore(
    useShallow(state => [
      state.selectedCurrency,
      state.currencies,
      state.setSelectedCurrency,
    ])
  );

  const languageOptions = languages;
  const currencyOptions = currencies.map(currency => currency.currency_code);

  const columns: FooterColumn[] = [
    {
      id: 'navigation',
      links: [
        {
          id: 'highlights',
          href: '/highlights',
        },
        {
          id: 'skills',
          href: '/skills',
        },
        {
          id: 'domains',
          href: '/domains',
        },
        {
          id: 'categories',
          href: '/categories',
        },
        {
          id: 'favorites',
          href: '/favorites',
        },
      ],
    },
    {
      id: 'links',
      links: [
        {
          id: 'github',
          href: 'https://github.com/llmgcc/keyskill-statistics',
          blank: true,
        },
      ],
    },
  ];

  return (
    <footer className="mt-10 bg-background-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-text-secondary">
              <Trans
                i18nKey="footer.text"
                values={{
                  appName: APP_NAME,
                }}
              />
            </p>
            <Button
              size="md"
              className="flex w-fit gap-1 border border-background-secondary bg-background-primary px-4 text-text-primary hover:bg-background-secondary"
              variant={'outline'}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div>
                <MdKeyboardDoubleArrowUp className="p-0" />
              </div>
              <div>{t('footer.backToTop')}</div>
            </Button>
          </div>

          <div className="flex gap-8 md:gap-16">
            {columns.map(c => (
              <div key={c.id}>
                <h3 className="mb-4 text-lg font-semibold text-text">
                  {t(`common.${c.id}`)}
                </h3>
                <ul className="space-y-2 text-sm">
                  {c.links.map(link => (
                    <li key={link.id}>
                      <Link
                        to={link.href}
                        className="text-text/80 hover:text-background-accent hover:underline"
                        target={link.blank ? '_blank' : undefined}
                      >
                        {t(`common.${link.id}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-sm text-text-secondary md:flex-row md:justify-between">
          <div className="space-y-1">
            <div>
              Powered by{' '}
              <Link
                to="https://hh.ru/"
                target="_blank"
                className="border-background-accent hover:text-background-accent hover:underline"
              >
                HeadHunter
              </Link>
            </div>
            <div>
              ©{new Date().getFullYear()} {APP_NAME}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <AppSelect
              value={selectedLanguage}
              options={languageOptions}
              onValueChange={details => i18n.changeLanguage(details.value[0])}
              triggerFormatter={() => (
                <div className="flex min-w-max items-center gap-1 px-2 text-sm text-text-primary">
                  <Badge className="text-text-secondary" variant={'plain'}>
                    {selectedLanguage}
                  </Badge>{' '}
                  {LanguageTitle[selectedLanguage as Language]}
                </div>
              )}
              valueFormatter={e => (
                <div className="flex min-w-max items-center gap-1 text-sm text-text-primary">
                  <Badge className="text-text-secondary" variant={'plain'}>
                    {e}
                  </Badge>{' '}
                  {LanguageTitle[e as Language]}
                </div>
              )}
              className="min-w-28 bg-background-primary"
            />
            <AppSelect
              value={selectedCurrency?.currency_code ?? ''}
              options={currencyOptions}
              onValueChange={details => setSelectedCurrency(details.value[0])}
              triggerFormatter={() => (
                <div className="flex min-w-max items-center gap-1 px-2 text-sm text-text-primary">
                  <Badge className="text-text-secondary" variant={'plain'}>
                    {selectedCurrency?.currency_code}
                  </Badge>{' '}
                  {t(`currency.${selectedCurrency?.currency_code ?? ''}`)}
                </div>
              )}
              valueFormatter={e => (
                <div className="flex min-w-max items-center gap-1 text-sm text-text-primary">
                  <Badge className="text-text-secondary" variant={'plain'}>
                    {e}
                  </Badge>{' '}
                  {t(`currency.${e ?? ''}`)}
                </div>
              )}
              className="min-w-44 bg-background-primary"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
