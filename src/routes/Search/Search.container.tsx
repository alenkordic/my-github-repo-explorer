import React, { useState, useEffect, useMemo } from "react";

import { useQuery } from "react-query";

import SearchView from "./Search.view";

import { getRepositories } from "./../../services/api";

const SearchContainer = () => {
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const {
    isLoading,
    data: repositories = { items: [], total_count: 0 },
  } = useQuery(
    ["repositories", searchString, page, rowsPerPage],
    () => getRepositories(searchString, page, rowsPerPage),
    {
      staleTime: 10000,
      enabled: !!searchString,
    }
  );

  const onInputChangeHandler = (string: string) => {
    setSearchString(string);
  };

  return (
    <SearchView
      onInputChange={onInputChangeHandler}
      searchInputValue={searchString}
      isDataLoading={isLoading}
      repositories={repositories}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
      rowsPerPage={rowsPerPage}
      page={page}
      responseTime={repositories?.duration}
    />
  );
};

export default SearchContainer;
