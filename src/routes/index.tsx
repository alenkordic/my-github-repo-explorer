import React from "react";
import { Routes as ReactRoutes, Link, Navigate, Route } from "react-router-dom";

import Search from "./Search";
import Details from "./Details";
import { NavigationBar } from "../components";

const Routes = () => {
 
  return (
    <div>
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
    </div>
  );
};

export default Routes;
