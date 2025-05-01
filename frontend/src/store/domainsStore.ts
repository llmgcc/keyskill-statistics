import { API } from '@/api/api';
import { Category } from '@/interfaces/index';
import { create } from 'zustand';

type DomainsStore = {
  domains: Category[];
  fetchDomains: () => Promise<void>;
};

export const useDomainsStore = create<DomainsStore>()((set) => ({
  domains: [],
  fetchDomains: async () => {
    const domains = await API.domainsList(30);
    set({ domains });
  },
}));
