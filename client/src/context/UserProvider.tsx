import { useState, useEffect, FC, ReactNode } from "react";
import { UserContext } from "./UserContext";

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Set user info and store in localStorage for persistence
  const setUserInfo = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
  };

  // Clear user info from state and localStorage
  const clearUserInfo = () => {
    setUserName(null);
    setUserEmail(null);
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
  };

  // On mount, check if localStorage has user info and rehydrate context if so
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName && storedEmail) {
      setUserName(storedName);
      setUserEmail(storedEmail);
    }
  }, []);

  const value = {
    isAuthenticated: !!userName && !!userEmail,
    userName,
    userEmail,
    setUserInfo,
    clearUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
