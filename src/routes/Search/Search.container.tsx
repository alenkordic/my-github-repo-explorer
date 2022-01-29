import React, { useState, useEffect, useMemo } from "react";

import { useQuery } from "react-query";

import SearchView from "./Search.view";

import { getRepositories } from "./../../services/api";
import { debounce } from "../../utils/utils";


const SearchContainer = () => {
  const [searchString, setSearchString] = useState("");
  const [isSearching, setIsSearching] = useState(true);
  const [inputTouched, setInputTouched]= useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  
  const { isLoading, data: repositories, isFetching } = useQuery({
    queryKey: ['repositories', page,rowsPerPage, searchString],
    queryFn: ()=> getRepositories(page, rowsPerPage, searchString),
    enabled: isSearching,
    keepPreviousData : true
  })


  // console.log("event.target.value",rowsPerPage)
  // console.log("page",page)
  
  
  const onInputChangeHandler = (string: string) => {
    setSearchString(string);
    setInputTouched(true)
  };

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setIsSearching(true)
  //   }, 500);

  //   return () => {
  //     clearTimeout(handler);
  //     setIsSearching(false)
  //   };
  // }, [searchString]);

  // if (isFetching) return <h1>Is FETCHING</h1>
  // if (isLoading) return <h1>Is isLoading</h1>

  return (
    <div>
      SearchContainer
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
    </div>
  );
};

export default SearchContainer;
