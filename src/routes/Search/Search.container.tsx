import React, { useState, useEffect, Suspense, lazy } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { getRepositories } from "./../../services/api";
import { Loader } from "./../../components";
const SearchView = lazy(() => import("./Search.view"));

const SearchContainer = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
    const search = searchParams.get("search")
    if(search) {
      setSearchString(search)
    }
  }, [])


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
    setSearchParams({
      search: string
    })
    setSearchString(string);
  };

  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default SearchContainer;
