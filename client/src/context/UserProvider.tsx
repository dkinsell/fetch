import React, { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const setUserInfo = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
  };

  const clearUserInfo = () => {
    setUserName(null);
    setUserEmail(null);
  };

  const value = {
    isAuthenticated: !!userName && !!userEmail,
    userName,
    userEmail,
    setUserInfo,
    clearUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
