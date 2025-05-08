import { useCurrencyStore } from '@/store/currencyStore';
import { Button, Spinner } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import { useShallow } from 'zustand/shallow';

import { CurrencyIcons } from '@/config/currencies';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/AppPopover';

export function CurrencySwitch() {
  const { t } = useTranslation();
  const [selectedCurrency, currencies, setSelectedCurrency] = useCurrencyStore(
    useShallow((state) => [
      state.selectedCurrency,
      state.currencies,
      state.setSelectedCurrency,
    ]),
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent>
        <div className="min-w-44 p-2">
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
                {selectedCurrency?.currency_code == c.currency_code ? (
                  <FaCheck />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
