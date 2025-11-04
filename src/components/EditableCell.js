import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import { TableCell, TextField } from "@mui/material";
import { useSelector } from "react-redux";
export default function EditableCell({ row, field, originalValue, onStage }) {
    const editedRows = useSelector((s) => s.table.editedRows);
    const staged = editedRows[row.id]?.[field];
    const value = staged !== undefined ? staged : originalValue;
    const [editing, setEditing] = useState(false);
    const [local, setLocal] = useState(value ?? "");
    React.useEffect(() => setLocal(value ?? ""), [value]);
    const commit = () => {
        // Basic validation for age
        if (field === "age") {
            const num = Number(local);
            if (Number.isNaN(num)) {
                alert("Age must be a number");
                return;
            }
            onStage({ [field]: num });
        }
        else {
            onStage({ [field]: local });
        }
        setEditing(false);
    };
    return (_jsx(TableCell, { onDoubleClick: () => setEditing(true), children: editing ? (_jsx(TextField, { value: local, size: "small", onChange: (e) => setLocal(e.target.value), onBlur: commit, onKeyDown: (e) => { if (e.key === "Enter")
                commit(); if (e.key === "Escape")
                setEditing(false); }, autoFocus: true })) : (_jsx("span", { children: value })) }));
}
