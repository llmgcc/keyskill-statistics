import { create } from 'zustand';
import { syncTabs } from 'zustand-sync-tabs';
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
    syncTabs(
      (set, get) => ({
        favorites: [],
        add: (name, type) => {
          set(state => {
            if (
              !state.favorites.some(s => s.name === name && s.type === type)
            ) {
              return {
                favorites: [...state.favorites, { name, type }],
              };
            }
            return state;
          });
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
      { name: 'favorites-sync' }
    ),
    {
      name: 'favorites-storage',
    }
  )
);
