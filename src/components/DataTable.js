import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Paper, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteRow, stageEdit, saveAllEdits, cancelAllEdits } from "../slices/tableSlice";
import EditableCell from "./EditableCell";
const ROWS_PER_PAGE = 10;
export default function DataTable() {
    const dispatch = useDispatch();
    const { rows, columns, editedRows } = useSelector((s) => s.table);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState(null);
    const [order, setOrder] = useState("asc");
    const visibleColumns = columns.filter(c => c.visible);
    // Filtering
    const filtered = useMemo(() => {
        if (!search.trim())
            return rows;
        const q = search.toLowerCase();
        return rows.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(q)));
    }, [rows, search]);
    // Sorting
    const sorted = useMemo(() => {
        if (!orderBy)
            return filtered;
        const arr = [...filtered].sort((a, b) => {
            const va = a[orderBy] ?? "";
            const vb = b[orderBy] ?? "";
            if (va < vb)
                return order === "asc" ? -1 : 1;
            if (va > vb)
                return order === "asc" ? 1 : -1;
            return 0;
        });
        return arr;
    }, [filtered, orderBy, order]);
    // Pagination
    const paginated = useMemo(() => {
        const start = page * ROWS_PER_PAGE;
        return sorted.slice(start, start + ROWS_PER_PAGE);
    }, [sorted, page]);
    const handleSort = (colKey) => {
        if (orderBy === colKey)
            setOrder(prev => prev === "asc" ? "desc" : "asc");
        else {
            setOrderBy(colKey);
            setOrder("asc");
        }
    };
    return (_jsxs(Paper, { sx: { p: 2 }, children: [_jsxs("div", { style: { display: "flex", gap: 12, marginBottom: 12 }, children: [_jsx(TextField, { label: "Search", value: search, onChange: (e) => { setSearch(e.target.value); setPage(0); } }), _jsx(Button, { variant: "contained", onClick: () => dispatch(saveAllEdits()), startIcon: _jsx(SaveIcon, {}), children: "Save All" }), _jsx(Button, { variant: "outlined", onClick: () => dispatch(cancelAllEdits()), startIcon: _jsx(CancelIcon, {}), children: "Cancel All" })] }), _jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [visibleColumns.map(col => (_jsx(TableCell, { children: _jsx(TableSortLabel, { active: orderBy === col.key, direction: orderBy === col.key ? order : "asc", onClick: () => handleSort(col.key), children: col.label }) }, col.key))), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: paginated.map(row => (_jsxs(TableRow, { hover: true, children: [visibleColumns.map(col => (_jsx(EditableCell, { row: row, field: col.key, originalValue: row[col.key], onStage: (patch) => dispatch(stageEdit({ id: row.id, patch })) }, col.key))), _jsxs(TableCell, { children: [_jsx(IconButton, { onClick: () => { }, children: _jsx(EditIcon, {}) }), _jsx(IconButton, { onClick: () => { if (confirm("Delete this row?"))
                                                    dispatch(deleteRow(row.id)); }, children: _jsx(DeleteIcon, {}) })] })] }, row.id))) })] }) }), _jsx(TablePagination, { component: "div", count: sorted.length, page: page, onPageChange: (_, newPage) => setPage(newPage), rowsPerPage: ROWS_PER_PAGE, rowsPerPageOptions: [ROWS_PER_PAGE] })] }));
}
