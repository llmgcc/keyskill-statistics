import { Badge, Button, Link, Separator } from '@chakra-ui/react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { Logo, APP_NAME } from '../Navigation/Logo';
import { Trans, useTranslation } from 'react-i18next';
import { AppSelect } from '../ui/AppSelect';
import { Language, LanguageTitle } from '@/config/languages';
import { useCurrencyStore } from '@/store/currencyStore';
import { useShallow } from 'zustand/shallow';


export function Footer() {
  const {t, i18n} = useTranslation()

  const selectedLanguage = i18n.language;
  const languages = Object.keys(Language);

  
  const [selectedCurrency, currencies, setSelectedCurrency] = useCurrencyStore(
    useShallow(state => [
      state.selectedCurrency,
      state.currencies,
      state.setSelectedCurrency,
    ])
  );

  
  const languageOptions = languages
  const currencyOptions = currencies.map(currency => currency.currency_code);

  const columns = [
    {
      id: 'navigation',
      links: [
        {
          id: 'skills',
          href: '#',
        },
        {
          id: 'categories',
          href: '#',
        },
        {
          id: 'domains',
          href: '#',
        },
        {
          id: 'highlights',
          href: '#',
        },
        {
          id: 'favourites',
          href: '#',
        },
      ]
    },
    {
      id: 'links',
      links: [
        {
          id: 'github',
          href: '#',
        },
      ]
    }
  ]




  return (
    <footer className="mt-10  bg-background-secondary/50 ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between ">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-text-secondary">
                <Trans
                  i18nKey="footer.text"
                  values={{
                    appName: APP_NAME
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
            
              {
                columns.map(c => (
                  <div key={c.id}>
                    <h3 className="mb-4 text-lg font-semibold text-text">
                      {t(`common.${c.id}`)}
                    </h3>
                    <ul className="space-y-2 text-sm">
                        {
                          c.links.map(link => (
                      
                         
                            <li key={link.id}>
                              <a
                                href="#"
                                className="text-text/80 hover:text-background-accent"
                              >
                                {t(`common.${link.id}`)}
                              </a>
                            </li>
                  
                        
                          ))
                        }
                    </ul>
                  </div>
                ))
              }

          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-sm text-text-secondary md:flex-row md:justify-between">
          <div className="space-y-1">
            <div>Powered by <Link href='https://hh.ru/' target='_blank'>HeadHunter</Link></div>
            <div>©{new Date().getFullYear()} {APP_NAME}</div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
                <AppSelect
                  value={selectedLanguage}
                  options={languageOptions}
                  onValueChange={details => i18n.changeLanguage(details.value[0])}
                  triggerFormatter={() => (
                    <div className="flex items-center gap-1 text-sm text-text-primary px-2 min-w-max">
                      <Badge className='text-text-secondary' variant={'plain'}>{selectedLanguage}</Badge> {LanguageTitle[selectedLanguage as Language]}
                    </div>
                  )}
                  valueFormatter={e => (
                    <div className="flex min-w-max items-center gap-1 text-sm text-text-primary">
                      <Badge className='text-text-secondary' variant={'plain'}>{e}</Badge> {LanguageTitle[e as Language]}
                    </div>
                  )}
                  className="bg-background-primary min-w-28"
                />
                <AppSelect
                  value={selectedCurrency?.currency_code ?? ''}
                  options={currencyOptions}
                  onValueChange={details => setSelectedCurrency(details.value[0])}
                  triggerFormatter={() => (
                    <div className="flex items-center gap-1 text-sm text-text-primary px-2 min-w-max">
                      <Badge className='text-text-secondary' variant={'plain'}>{selectedCurrency?.currency_code}</Badge> {t(`currency.${selectedCurrency?.currency_code ?? ''}`)}
                    </div>
                  )}
                  valueFormatter={e => (
                    <div className="flex min-w-max items-center gap-1 text-sm text-text-primary">
                      <Badge className='text-text-secondary' variant={'plain'}>{e}</Badge> {t(`currency.${e ?? ''}`)}
                    </div>
                  )}
                  className="bg-background-primary min-w-44"
                />
          </div>
        </div>
      </div>
    </footer>
  );
}
