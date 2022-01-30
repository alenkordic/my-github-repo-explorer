import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";

import { RepoExplorerContextProvider } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

ReactDOM.render(
  <RepoExplorerContextProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RepoExplorerContextProvider>,
  document.getElementById("root")
);
