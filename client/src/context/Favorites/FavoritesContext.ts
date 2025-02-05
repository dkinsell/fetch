import { createContext } from "react";

// Define the context properties for the Favorites context
export interface FavoritesContextProps {
  favorites: string[];
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
  clearFavorites: () => void;
}

// Create the Favorites context
export const FavoritesContext = createContext<
  FavoritesContextProps | undefined
>(undefined);
