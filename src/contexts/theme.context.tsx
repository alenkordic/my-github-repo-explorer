import React, { useEffect, createContext, useState, useContext } from "react";
// import { graphQLClient } from "services/graphqlClient";
import useLocalStorage from "./../hooks/useLocalStorage";

const ThemeContext = createContext({
  toggleDarkMode : ()=> {},
  darkMode: false
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: AuthProviderProps) => {

  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);



  // useEffect(() => {
  //   if (darkMode) {
  //     console.log("USERR IS LOGGED IN!");
  //     setIsAuthenticated(true)
  //   }
  //   setLoading(false);
  //   // eslint-disable-next-line
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  console.log("THEEMEEE");



  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode)
  };

  const themeContext = {
    toggleDarkMode: handleToggleDarkMode,
    darkMode: darkMode
  };

  return (
    <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider , useThemeContext };
