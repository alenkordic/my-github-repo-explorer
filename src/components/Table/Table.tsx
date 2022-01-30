import React, { useEffect } from "react";

import TableRowItem from "./TableRowItem/TableRowItem"

import {
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  TableContainer,
  TableBody,
} from "@mui/material";

import { RepositoriesType } from "./../../types";

interface TableProps {
  isDataLoading: boolean;
  repositories: RepositoriesType;
  setPage: (s: number) => void;
  setRowsPerPage: (s: number) => void;
  rowsPerPage: number;
  page: number;
}

// TABLE COMPONENT ----------------------------------------------------------
const Table = ({
  repositories,
  isDataLoading,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  page,
}: TableProps) => {

  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage < 0) return;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);

  };

  if (isDataLoading) return <h1>Loading....</h1>;

  // console.log("resultItems", repositories);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <MUITable stickyHeader aria-label="sticky table" size="medium">
          <TableHead>
            <TableRow>
              <TableCell>header</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.items.map((repository) => {
              return (
                <TableRowItem key={repository.id} {...repository}/> )
            })}
          </TableBody>
        </MUITable>
      </TableContainer>


      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={repositories.total_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

// export default React.memo(Table);
export default Table;
