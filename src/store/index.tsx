import React from "react";
import { repoExplorerReducer } from "./reducer";
import { defaultState } from "./reducer/defaultState";

import { AppContextType } from "./../types";

type RepoExplorerContextProviderProps = {
  children: React.ReactNode;
};

const RepoExplorerContext = React.createContext({} as AppContextType);

const RepoExplorerContextProvider = ({
  children,
}: RepoExplorerContextProviderProps) => {
  const [state, dispatch] = React.useReducer(repoExplorerReducer, defaultState);

  const value = { state, dispatch };

  return (
    <RepoExplorerContext.Provider value={value}>
      {children}
    </RepoExplorerContext.Provider>
  );
};

const useRepoExplorerContext = () => {
  const context = React.useContext(RepoExplorerContext);

  return context;
};

export { RepoExplorerContextProvider, useRepoExplorerContext };
