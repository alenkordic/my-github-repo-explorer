import { Box, Typography } from "@mui/material";


import { SearchInputField, Table, Loader } from "./../../components";
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
}: SearchViewProps): JSX.Element => {
  const infoText = searchInputValue ? "No repositories to show..." : "";
  console.log("searchInputValue", searchInputValue);

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
              isDataLoading={isDataLoading}
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
