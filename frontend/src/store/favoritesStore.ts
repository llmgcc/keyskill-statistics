import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavouriteType = 'skills' | 'domains' | 'categories';

interface FavoritesStore {
  favourites: { name: string; type: FavouriteType }[];
  add: (skill: string, type: FavouriteType) => void;
  remove: (name: string, type: FavouriteType) => void;
  isFavorite: (name: string, type: FavouriteType) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],
      add: (name, type) => {
        const { favourites } = get();
        if (!favourites.some(s => s.name === name && s.type === type)) {
          set({ favourites: [...favourites, { name, type }] });
        }
      },
      remove: (name, type) => {
        set(state => ({
          favourites: state.favourites.filter(
            s => s.name !== name && s.type !== type
          ),
        }));
      },
      isFavorite: (name, type) => {
        const list = get().favourites;
        return !!list.find(s => s.name === name && s.type === type);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
