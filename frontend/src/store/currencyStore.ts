import { API } from '@/api/api';
import { Currency } from '@/interfaces/index';
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        const currencies = await API.currencyList();
        if (currencies.length) {
          const filteredCurrencies = currencies.filter((c: Currency) =>
            usedCurrencies.includes(c?.currency_code),
          );
          set({ currencies: filteredCurrencies });
          if (!get().selectedCurrency)
            set({ selectedCurrency: filteredCurrencies[0] });
        }
      },
      setSelectedCurrency: (code) => {
        set((state) => ({
          selectedCurrency:
            state.currencies.find((c) => c.currency_code === code) ?? null,
        }));
      },
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ selectedCurrency: state.selectedCurrency }),
    },
  ),
);
