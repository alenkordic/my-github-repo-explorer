import React from "react";
import { Routes as ReactRoutes, Route, Link, Navigate } from "react-router-dom";
import Search from "./Search";
import Details from "./Details";

const Routes = () => {
  return (
    <div>
      <h1>Welcome to React Router!</h1>
      <ReactRoutes>
        <Route path="/" element={<Navigate to="/repositories" />} />
        <Route path="/repositories" element={<Search />} />
        <Route
        path="repositories/:repoId"
        element={<Details />}
      />
        <Route path="*" element={<Navigate to="/repositories" />} />
      </ReactRoutes>
    </div>
  );
};

export default Routes;
