import { API } from '@/api/api';
import { create } from 'zustand';

import { Category } from '@/interfaces/index';

type CategoriesStore = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
};

export const useCategoriesStore = create<CategoriesStore>()(set => ({
  categories: [],
  strict: true,
  fetchCategories: async () => {
    const categories = await API.categoriesList();
    set({ categories: categories });
  },
}));
