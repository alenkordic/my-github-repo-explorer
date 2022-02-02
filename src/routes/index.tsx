import React from "react";
import { Routes as ReactRoutes, Link, Navigate, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

import Search from "./Search";
import Details from "./Details";
import { NavigationBar } from "../components";

import {useThemeContext} from "./../contexts/theme.context"


const Routes = () => {

  const {darkMode} = useThemeContext()

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
 
  return (
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <NavigationBar />
      <ReactRoutes>
        <Route path="/" element={<Navigate to="/repositories" />} />
        <Route path="/repositories" element={<Search />} />
        <Route
        path="repositories/:owner/:repoName"
        element={<Details />}
      />
        <Route path="*" element={<Navigate to="/repositories" />} />

      </ReactRoutes>
    </ThemeProvider>
  );
};

export default Routes;
