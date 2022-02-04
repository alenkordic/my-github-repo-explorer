import React, { createContext, useContext } from "react";

import useLocalStorage from "./../hooks/useLocalStorage";

const ThemeContext = createContext({
  toggleDarkMode: () => {},
  darkMode: false
});
interface ThemeProviderProps {
  children: React.ReactNode;
}
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const themeContext = {
    toggleDarkMode: handleToggleDarkMode,
    darkMode: darkMode
  };
  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};
const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider, useThemeContext };
