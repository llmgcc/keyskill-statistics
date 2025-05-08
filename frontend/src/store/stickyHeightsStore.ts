import { create } from 'zustand';

interface StickyHeights {
  heights: Record<string, number>;
  setHeight: (id: string, height: number) => void;
  getOffset: (id: string) => number;
}

export const useStickyHeights = create<StickyHeights>((set, get) => ({
  heights: {},
  setHeight: (id, height) => set((state) => ({ heights: { ...state.heights, [id]: height } })),
  getOffset: (id) => {
    const ids = Object.keys(get().heights);
    const index = ids.indexOf(id);
    return ids.slice(0, index).reduce((acc, curr) => acc + get().heights[curr], 0);
  },
}));