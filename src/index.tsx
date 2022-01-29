import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";

import { RepoExplorerContextProvider } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <RepoExplorerContextProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RepoExplorerContextProvider>,
  document.getElementById("root")
);
