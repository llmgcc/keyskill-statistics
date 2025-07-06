import { useCurrencyStore } from '@/store/currencyStore';

export function useCurrencyValue(valueInRUB: number) {
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  return {
    value: valueInRUB * (selectedCurrency?.currency_rate ?? 1),
    abbr: selectedCurrency?.currency_abbr,
    code: selectedCurrency?.currency_code,
  };
}
