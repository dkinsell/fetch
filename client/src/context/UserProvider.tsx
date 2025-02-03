// src/context/UserProvider.tsx
import { useState, useEffect, FC, ReactNode } from "react";
import { UserContext } from "./UserContext";
import { getBreeds } from "../api"; // Protected endpoint

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // When a user logs in, store their info both in state and localStorage
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

  // On mount, rehydrate from localStorage and validate the session
  useEffect(() => {
    // Rehydrate from localStorage
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName && storedEmail) {
      setUserName(storedName);
      setUserEmail(storedEmail);
    }

    // Validate the session by calling a protected endpoint
    const validateSession = async () => {
      try {
        await getBreeds(); // If this call succeeds, the session is valid.
      } catch (error) {
        // If the call fails with a 401 error, clear the user info.
        if (error instanceof Error && error.message.includes("401")) {
          clearUserInfo();
        }
      }
    };

    validateSession();
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
