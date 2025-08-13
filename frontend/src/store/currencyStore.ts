import { API } from '@/api/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Currency } from '@/interfaces/index';
import { CurrencyIcons } from '@/config/currencies';

type CurrencyStore = {
  currencies: Currency[];
  selectedCurrency: Currency | null;
  fetchCurrencies: () => Promise<void>;
  setSelectedCurrency: (code: string) => void;
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currencies: [],
      selectedCurrency: null,
      fetchCurrencies: async () => {
        const usedCurrencies = Object.keys(CurrencyIcons);
        const currencies = await API.general.currencyList();
        if (currencies.length) {
          // Fix RUR
          const rur = currencies.find(c => c.currency_code === 'RUR');
          if (rur) rur.currency_code = 'RUB';

          const filteredCurrencies = currencies
            .filter((c: Currency) => usedCurrencies.includes(c?.currency_code))
            .sort((a, b) => {
              const aIndex = Object.keys(CurrencyIcons).indexOf(
                a.currency_code
              );
              const bIndex = Object.keys(CurrencyIcons).indexOf(
                b.currency_code
              );
              return aIndex - bIndex;
            });

          set({ currencies: filteredCurrencies });
          if (!get().selectedCurrency)
            set({ selectedCurrency: filteredCurrencies[0] });
        }
      },
      setSelectedCurrency: code => {
        set(state => ({
          selectedCurrency:
            state.currencies.find(c => c.currency_code === code) ?? null,
        }));
      },
    }),
    {
      name: 'currency-storage',
      partialize: state => ({ selectedCurrency: state.selectedCurrency }),
    }
  )
);
