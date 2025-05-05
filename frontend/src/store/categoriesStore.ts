import { API } from '@/api/api';
import { Category } from '@/interfaces/index';
import { create } from 'zustand';

type CategoriesStore = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
};

export const useCategoriesStore = create<CategoriesStore>()((set) => ({
  categories: [],
  strict: true,
  fetchCategories: async () => {
    const categories = await API.categoriesList(30);
    set({ categories: categories });
  }
}));
