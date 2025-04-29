import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PeriodStore = {
  periodList: number[];
  selectedPeriod: number | null;
  setPeriod: (period: number) => void;
};

const PERIODS = [7, 14, 30];

export const usePeriodStore = create<PeriodStore>()(
  persist(
    (set) => ({
      selectedPeriod: PERIODS[2],
      periodList: PERIODS,
      setPeriod: (period: number) => {
        set({ selectedPeriod: period });
      },
    }),
    {
      name: 'period-storage',
      partialize: (state) => ({ selectedPeriod: state.selectedPeriod }),
    },
  ),
);
