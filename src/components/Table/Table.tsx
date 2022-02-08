import React from "react";
import {
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  TableContainer,
  TableBody,
  Box,
  Typography
} from "@mui/material";

import { TableProps } from "../../interfaces/interfaces";
import TableRowItem from "../Table/TableRowItem/TableRowItem";
import { displaySecondsFromMilis } from "../../utils/utils";

const Table = ({
  repositories,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  page,
  responseTime
}: TableProps): JSX.Element => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage < 0) return;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} data-cy="tableContainer">
      <TableContainer sx={{ maxHeight: 400 }}>
        <MUITable stickyHeader aria-label="sticky table" size="medium">
          <TableHead>
            <TableRow>
              <TableCell>
                <Box display="flex" justifyContent="flex-end">
                  <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                    {`Results displayed in ${displaySecondsFromMilis(
                      responseTime
                    )} seconds`}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.items.map((repository, index) => {
              return <TableRowItem key={index} {...repository} />;
            })}
          </TableBody>
        </MUITable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={repositories.total_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-cy="pagination"
      />
    </Paper>
  );
};

export default Table;
