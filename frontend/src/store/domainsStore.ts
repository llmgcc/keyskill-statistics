import { API } from '@/api/api';
import { Category } from '@/interfaces/index';
import { create } from 'zustand';

type DomainsStore = {
  domains: Category[];
  fetchDomains: () => Promise<void>;
  selectedDomain: Category | null;
  setSelectedDomain: (domain: Category) => void;
  strict: boolean;
  setStrict: (strict: boolean) => void;
};

export const useDomainsStore = create<DomainsStore>()((set) => ({
  domains: [],
  strict: true,
  fetchDomains: async () => {
    const domains = await API.domainsList(30);
    set({ domains });
  },
  selectedDomain: null,
  setSelectedDomain: (domain: Category) => {
    set({ selectedDomain: domain });
  },
  setStrict: (strict) => {
    set({ strict: strict });
  },
}));
