import React, { useEffect, createContext, useState, useContext } from "react";

import useLocalStorage from "./../hooks/useLocalStorage";

const AuthContext = createContext({
  isAuthenticated: false,
  logout: () => {},
  login: (acceesToken: string, refreshToken: string) => {}
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [acceessToken, setAcceessToken] = useLocalStorage("accessToken", null);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);

  useEffect(() => {
    if (acceessToken) {
      setIsAuthenticated(true);
    }
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogin = (acceessToken: string, refreshToken: string) => {
    setAcceessToken(acceessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setAcceessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  const authContext = {
    isAuthenticated: isAuthenticated,
    logout: handleLogout,
    login: handleLogin
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
