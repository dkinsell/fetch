import { FC, useState, ReactNode, useEffect } from "react";
import { FavoritesContext } from "./FavoritesContext";

const STORAGE_KEY = "favoritesArray";

export const FavoritesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      return [];
    }
  });

  // Sync localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  const addFavorite = (dogId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(dogId)) {
        return [...prev, dogId];
      }
      return prev;
    });
  };

  const removeFavorite = (dogId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== dogId));
  };

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
