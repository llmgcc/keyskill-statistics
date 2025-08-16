import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

import { CurrencyIcons } from '@/config/currencies';
import { useCurrencyStore } from '@/store/currencyStore';
import {
  NavigationSelect,
  Option,
} from '@/components/Navigation/NavigationSelect';

export function CurrencySwitch() {
  const { t } = useTranslation();
  const [selectedCurrency, currencies, setSelectedCurrency] = useCurrencyStore(
    useShallow(state => [
      state.selectedCurrency,
      state.currencies,
      state.setSelectedCurrency,
    ])
  );

  const options = useMemo(
    () =>
      currencies.map(c => ({
        code: c.currency_code,
        name: t(`currency.${c.currency_code}`),
      })),
    [currencies, t]
  );

  const currencyIcon = useMemo(() => {
    if (selectedCurrency) {
      const CurrencyIcon = CurrencyIcons[selectedCurrency.currency_code].type;
      return (
        <CurrencyIcon className="cursor-pointer text-xl font-[900] text-text transition-colors duration-150 hover:text-background-accent" />
      );
    }
    return null;
  }, [selectedCurrency]);

  const handleSelect = useCallback(
    (option: Option) => setSelectedCurrency(option.code),
    [setSelectedCurrency]
  );

  return (
    <NavigationSelect
      title={t('navigation.tooltips.currency')}
      icon={currencyIcon}
      options={options}
      selectedOptionCode={selectedCurrency?.currency_code ?? null}
      onSelect={handleSelect}
    />
  );
}
