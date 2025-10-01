import { create } from 'zustand'

type FavoriteState = {
  favorites: number[]
  setFavorites: (ids: number[]) => void
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  hasFavorite: (id: number) => boolean
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  setFavorites: (ids) => set({ favorites: ids }),
  addFavorite: (id) => {
    if (!get().favorites.includes(id)) {
      set((s) => ({ favorites: [...s.favorites, id] }))
    }
  },
  removeFavorite: (id) => {
    set((s) => ({ favorites: s.favorites.filter((f) => f !== id) }))
  },
  hasFavorite: (id) => get().favorites.includes(id),
}))
