import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type favoriteType = 'skills' | 'domains' | 'categories';

interface FavoritesStore {
  favorites: { name: string; type: favoriteType }[];
  add: (skill: string, type: favoriteType) => void;
  remove: (name: string, type: favoriteType) => void;
  isFavorite: (name: string, type: favoriteType) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      add: (name, type) => {
        const { favorites } = get();
        if (!favorites.some(s => s.name === name && s.type === type)) {
          set({ favorites: [...favorites, { name, type }] });
        }
      },
      remove: (name, type) => {
        set(state => ({
          favorites: state.favorites.filter(
            s => !(s.name === name && s.type === type)
          ),
        }));
      },
      isFavorite: (name, type) => {
        const list = get().favorites;
        return !!list.find(s => s.name === name && s.type === type);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
