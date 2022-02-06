import { Box, Typography } from "@mui/material";

import { SearchViewProps } from "../../interfaces/interfaces";

import { SearchInputField, Table, Loader } from "./../../components";

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
}: SearchViewProps): JSX.Element => {
  const infoText = searchInputValue ? "No repositories to show..." : "";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={600}
      m="0 auto"
      px={3}
      mt={16}
    >
      <Box mb={5} width="100%">
        <SearchInputField onChange={onInputChange} value={searchInputValue} />
      </Box>
      {isDataLoading ? (
        <Loader text="Loading repositories..." />
      ) : (
        <Box mb={5} width="100%">
          {repositories.total_count === 0 ? (
            <Typography variant="h6">{infoText}</Typography>
          ) : (
            <Table
              repositories={repositories}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              rowsPerPage={rowsPerPage}
              page={page}
              responseTime={responseTime}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchView;
