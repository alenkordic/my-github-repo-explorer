import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { getRepositories } from "./../../services/api";
import SearchView from "./Search.view";

const SearchContainer = (): JSX.Element => {
  const [searchString, setSearchString] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchString(search);
    }
  }, [searchString, searchParams]);

  const { isLoading, data: repositories = { items: [], total_count: 0 } } =
    useQuery(
      ["repositories", searchString, page, rowsPerPage],
      () => getRepositories(searchString, page, rowsPerPage),
      {
        staleTime: 10000,
        enabled: !!searchString
      }
    );

  const onInputChangeHandler = (string: string) => {
    if (string.length > 0) {
      setSearchParams({
        search: encodeURIComponent(string)
      });
    } else {
      setSearchParams({});
    }
    setSearchString(string);
  };

  return (
    <>
      <Helmet>
      <meta
          charSet="utf-8"
          name="description"
          content="This is repositories search page."
        />
        <title>Search | Git Repo Explorer</title>
        <link rel="canonical" href="http://localhost:3000/repositories" />
      </Helmet>
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
        searchString={searchString}
      />
    </>
  );
};

export default SearchContainer;
