import { API } from '@/api/api';
import { Category } from '@/interfaces/index';
import { create } from 'zustand';

type CategoriesStore = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  strict: boolean;
  setStrict: (strict: boolean) => void;
};

export const useCategoriesStore = create<CategoriesStore>()((set) => ({
  categories: [],
  strict: true,
  fetchCategories: async () => {
    const categories = await API.categoriesList(30);
    set({ categories: categories });
  },
  selectedCategory: null,
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
  setStrict: (strict) => {
    set({ strict: strict });
  },
}));
