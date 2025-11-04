import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const defaultColumns = [
    { key: "name", label: "Name", visible: true },
    { key: "email", label: "Email", visible: true },
    { key: "age", label: "Age", visible: true },
    { key: "role", label: "Role", visible: true },
];
const initialState = {
    rows: [
        { id: uuidv4(), name: "Alice", email: "alice@example.com", age: 28, role: "Engineer" },
        { id: uuidv4(), name: "Bob", email: "bob@example.com", age: 35, role: "Manager" },
        // more sample rows...
    ],
    columns: defaultColumns,
    editedRows: {},
};
const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setRows(state, action) { state.rows = action.payload; },
        addRow(state, action) {
            state.rows.unshift({ id: uuidv4(), ...action.payload });
        },
        updateRow(state, action) {
            const idx = state.rows.findIndex(r => r.id === action.payload.id);
            if (idx >= 0)
                state.rows[idx] = { ...state.rows[idx], ...action.payload.patch };
        },
        deleteRow(state, action) {
            state.rows = state.rows.filter(r => r.id !== action.payload);
        },
        setColumns(state, action) { state.columns = action.payload; },
        toggleColumnVisibility(state, action) {
            state.columns = state.columns.map(c => c.key === action.payload ? { ...c, visible: !c.visible } : c);
        },
        addColumn(state, action) {
            state.columns.push(action.payload);
        },
        stageEdit(state, action) {
            state.editedRows[action.payload.id] = { ...(state.editedRows[action.payload.id] ?? {}), ...action.payload.patch };
        },
        saveAllEdits(state) {
            for (const id in state.editedRows) {
                const rowIndex = state.rows.findIndex(r => r.id === id);
                if (rowIndex >= 0)
                    state.rows[rowIndex] = { ...state.rows[rowIndex], ...state.editedRows[id] };
            }
            state.editedRows = {};
        },
        cancelAllEdits(state) { state.editedRows = {}; },
        replaceAll(state, action) { state.rows = action.payload; },
    },
});
export const { setRows, addRow, updateRow, deleteRow, setColumns, toggleColumnVisibility, addColumn, stageEdit, saveAllEdits, cancelAllEdits, replaceAll } = tableSlice.actions;
export default tableSlice.reducer;
