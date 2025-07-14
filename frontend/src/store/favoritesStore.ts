import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoritesStore = {
  favoriteSkills: string[];
  addSkill: (skill: string) => void;
  removeSkill: (name: string) => void;
  isFavorite: (name: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteSkills: [],
      addSkill: skill => {
        const { favoriteSkills } = get();
        if (!favoriteSkills.some(s => s === skill)) {
          set({ favoriteSkills: [...favoriteSkills, skill] });
        }
      },
      removeSkill: name => {
        set(state => ({
          favoriteSkills: state.favoriteSkills.filter(s => s !== name),
        }));
      },
      isFavorite: name => {
        const list = get().favoriteSkills;
        return !!list.find(s => s === name);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
