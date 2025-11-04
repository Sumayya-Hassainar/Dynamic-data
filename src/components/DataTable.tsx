import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, IconButton, Paper, TextField, Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteRow, stageEdit, saveAllEdits, cancelAllEdits } from "../slices/tableSlice";
import EditableCell from "./EditableCell";

const ROWS_PER_PAGE = 10;

export default function DataTable() {
  const dispatch = useDispatch();
  const { rows, columns, editedRows } = useSelector((s: RootState) => s.table);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const visibleColumns = columns.filter(c => c.visible);

  // Filtering
  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter(row =>
      Object.values(row).some(v => String(v).toLowerCase().includes(q))
    );
  }, [rows, search]);

  // Sorting
  const sorted = useMemo(() => {
    if (!orderBy) return filtered;
    const arr = [...filtered].sort((a, b) => {
      const va = a[orderBy] ?? "";
      const vb = b[orderBy] ?? "";
      if (va < vb) return order === "asc" ? -1 : 1;
      if (va > vb) return order === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, orderBy, order]);

  // Pagination
  const paginated = useMemo(() => {
    const start = page * ROWS_PER_PAGE;
    return sorted.slice(start, start + ROWS_PER_PAGE);
  }, [sorted, page]);

  const handleSort = (colKey: string) => {
    if (orderBy === colKey) setOrder(prev => prev === "asc" ? "desc" : "asc");
    else { setOrderBy(colKey); setOrder("asc"); }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <TextField label="Search" value={search} onChange={(e)=>{setSearch(e.target.value); setPage(0);}}/>
        <Button variant="contained" onClick={() => dispatch(saveAllEdits())} startIcon={<SaveIcon />}>Save All</Button>
        <Button variant="outlined" onClick={() => dispatch(cancelAllEdits())} startIcon={<CancelIcon />}>Cancel All</Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map(col => (
                <TableCell key={col.key}>
                  <TableSortLabel
                    active={orderBy === col.key}
                    direction={orderBy === col.key ? order : "asc"}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map(row => (
              <TableRow key={row.id} hover>
                {visibleColumns.map(col => (
                  <EditableCell
                    key={col.key}
                    row={row}
                    field={col.key}
                    originalValue={row[col.key]}
                    onStage={(patch) => dispatch(stageEdit({ id: row.id, patch }))}
                  />
                ))}
                <TableCell>
                  <IconButton onClick={() => {/* could open full edit modal */}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => { if (confirm("Delete this row?")) dispatch(deleteRow(row.id)) }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={ROWS_PER_PAGE}
        rowsPerPageOptions={[ROWS_PER_PAGE]}
      />
    </Paper>
  );
}
