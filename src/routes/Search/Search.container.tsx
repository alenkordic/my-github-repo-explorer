import React, { useState, useEffect, useMemo } from "react";

import { useQuery } from "react-query";

import SearchView from "./Search.view";

import { getRepositories } from "./../../services/api";
import { debounce } from "../../utils/utils";

const SearchContainer = () => {
  const [searchString, setSearchString] = useState("");
  const [searchStringToSend, setSearchStringToSend] = useState("");
  const [inputTouched, setInputTouched] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {
    isLoading,
    data: repositories,
    isFetching,
  } = useQuery(
    ["repositories", searchStringToSend],
    () => getRepositories(searchStringToSend),
    {
      staleTime: 10000
    }
  );

  const onInputChangeHandler = (string: string) => {
    setSearchString(string)
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchStringToSend(searchString);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchString]);

  // if (isFetching) return <h1>Is FETCHING</h1>;
  // if (isLoading) return <h1>Is isLoading</h1>;

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
    />
  );
};

export default SearchContainer;
