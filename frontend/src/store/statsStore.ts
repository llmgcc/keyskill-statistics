import { API } from '@/api/api';
import { Stats } from '@/interfaces/index';
import { create } from 'zustand';

type StatsStore = {
  stats: Stats | null;
  fetchStats: () => Promise<void>;
};

export const useStatsStore = create<StatsStore>()((set) => ({
  stats: null,
  fetchStats: async () => {
    const stats = await API.mainStats();
    set({ stats });
  },
}));
