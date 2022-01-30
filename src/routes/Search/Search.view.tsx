import React from "react";
import Box from '@mui/material/Box';

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
    <>
    <Box mb={5}>
      <SearchInputField onChange={onInputChange} value={searchInputValue} />
    </Box>
      <Table
        repositories={repositories}
        isDataLoading={isDataLoading}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </>
  );
};

export default SearchView;
