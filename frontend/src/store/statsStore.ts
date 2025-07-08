import { API } from '@/api/api';
import { create } from 'zustand';

import { Stats } from '@/interfaces/index';

type StatsStore = {
  stats: Stats | null;
  fetchStats: () => Promise<void>;
};

export const useStatsStore = create<StatsStore>()(set => ({
  stats: null,
  fetchStats: async () => {
    const stats = await API.mainStats();
    set({ stats });
  },
}));
