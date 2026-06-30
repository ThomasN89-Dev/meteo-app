import type { FavoriteModel } from "@/models/model";
import { create } from "zustand";

interface FavoriteStoreModel {
  favorites: FavoriteModel[];
  onAddFavorite: (favorite: FavoriteModel) => boolean;
  onRemoveFavorite: (favorite: FavoriteModel) => void;
}

export const useFavoriteStore = create<FavoriteStoreModel>()((set, get) => ({
  favorites: [],
  onAddFavorite: (favorite) => {
    const isDuplicate = get().favorites.some(
      (f) =>
        f.latitude === favorite.latitude && f.longitude === favorite.longitude,
    );
    if (isDuplicate) return false;
    set((state) => ({ favorites: [...state.favorites, favorite] }));
    return true;
  },
  onRemoveFavorite: (favorite) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (f) =>
          f.latitude !== favorite.latitude ||
          f.longitude !== favorite.longitude,
      ),
    })),
}));
