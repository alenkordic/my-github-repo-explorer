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
  responseTime: number;
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
  responseTime
}: SearchViewProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" maxWidth={560} m="0 auto" px={3}>
    <Box mb={5} width="100%">
      <SearchInputField onChange={onInputChange} value={searchInputValue} />
    </Box>
    <Box mb={5}  width="100%">
      <Table
        repositories={repositories}
        isDataLoading={isDataLoading}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        responseTime={responseTime}
      />
    </Box>
    </Box>
  );
};

export default SearchView;
