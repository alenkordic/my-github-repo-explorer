import React, { Suspense, lazy } from "react";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { NavigationBar, Loader } from "../components";

import Search from "./Search";
import { useThemeContext } from "./../contexts/theme.context";

const Details = lazy(() => import("./Details"));

const Routes = () => {
  const { darkMode } = useThemeContext();

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavigationBar />
      <ReactRoutes>
        <Route path="/" element={<Navigate to="/repositories" />} />
        <Route path="/repositories" element={<Search />} />
        <Route
          path="/repositories/:owner/:repoName"
          element={
            <Suspense fallback={<Loader text="Loading datails..." />}>
              <Details />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/repositories" />} />
      </ReactRoutes>
    </ThemeProvider>
  );
};

export default Routes;
