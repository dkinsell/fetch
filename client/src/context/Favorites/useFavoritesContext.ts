import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";

// Custom hook for accessing the Favorites context
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};
