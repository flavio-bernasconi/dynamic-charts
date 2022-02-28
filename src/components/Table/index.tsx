import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import { useSelector } from "react-redux";
import { RootState } from "store";
import { StyledTableCell, StyledTableRow } from "./styles";

interface Props {
  dataset: unknown[];
  tableHeadValues: string[];
}

export const BasicTable = ({ dataset, tableHeadValues }: Props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };
  return (
    <Paper
      sx={{
        maxWidth: "1100px",
        width: "100%",
        overflow: "hidden",
        margin: "auto",
      }}
    >
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeadValues.map((value: any, i) => (
                <StyledTableCell key={i}>{value}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataset
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, i) => {
                const columnsValues: unknown[] = Object.values(row);
                return (
                  <StyledTableRow key={i}>
                    {columnsValues.map((column: any, i) => (
                      <StyledTableCell key={i} align="left">
                        {column}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 75, 100]}
        component="div"
        count={dataset.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
