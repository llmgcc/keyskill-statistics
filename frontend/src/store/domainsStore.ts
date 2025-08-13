import { API } from '@/api/api';
import { create } from 'zustand';

import { Category } from '@/interfaces/index';

type DomainsStore = {
  domains: Category[];
  fetchDomains: () => Promise<void>;
};

export const useDomainsStore = create<DomainsStore>()(set => ({
  domains: [],
  strict: true,
  fetchDomains: async () => {
    const domains = (await API.domains.domainsList()).domains;
    set({ domains });
  },
}));
