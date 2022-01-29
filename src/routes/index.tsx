import React from "react";
import { Routes as ReactRoutes, Route, Link } from "react-router-dom";
import Search from "./Search";

const Routes = () => {
  return (
    <div>
      <h1>Welcome to React Router!</h1>
      <ReactRoutes>
        <Route path="/" element={<Search />} />
      </ReactRoutes>
    </div>
  );
};

export default Routes;
