import { createContext } from "react";

interface UserContextProps {
  isAuthenticated: boolean;
  userName: string | null;
  userEmail: string | null;
  setUserInfo: (name: string, email: string) => void;
  clearUserInfo: () => void;
}

// Create the User context
export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);
