import { useContext } from "react";
import { UserContext } from "./UserContext";

// Custom hook for accessing the User context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
