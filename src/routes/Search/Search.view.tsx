import React from "react";

import { SearchInputField, Table } from "./../../components";

import { RepositoriesType } from "./../../types";

interface SearchViewProps {
  isDataLoading: boolean;
  repositories: RepositoriesType;
  onInputChange: (s: string) => void;
  setPage: (s: number) => void;
  setRowsPerPage: (s: number) => void;
  searchInputValue: string;
  rowsPerPage: number;
  page: number;
}

const SearchView = ({
  onInputChange,
  searchInputValue,
  repositories,
  isDataLoading,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  page,
}: SearchViewProps) => {
  return (
    <div>
      <SearchInputField onChange={onInputChange} value={searchInputValue} />
      <Table
        repositories={repositories}
        isDataLoading={isDataLoading}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </div>
  );
};

export default SearchView;
