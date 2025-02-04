import { FC, useState, ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Add a dog ID to the array if it's not already there
  const addFavorite = (dogId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(dogId)) {
        return [...prev, dogId];
      }
      return prev;
    });
  };

  // Remove a dog ID if it exists in the array
  const removeFavorite = (dogId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== dogId));
  };

  // Clear the entire favorites array
  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
