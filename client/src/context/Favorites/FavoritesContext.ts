import { createContext } from "react";

export interface FavoritesContextProps {
  favorites: string[];
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<
  FavoritesContextProps | undefined
>(undefined);
