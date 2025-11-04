import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, TextField, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleColumnVisibility, addColumn } from "../slices/tableSlice";
export default function ManageColumnsModal({ open, onClose }) {
    const dispatch = useDispatch();
    const columns = useSelector((s) => s.table.columns);
    const [newKey, setNewKey] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const handleAdd = () => {
        if (!newKey.trim())
            return alert("Key required");
        const col = { key: newKey.trim(), label: newLabel || newKey.trim(), visible: true };
        dispatch(addColumn(col));
        setNewKey("");
        setNewLabel("");
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, fullWidth: true, children: [_jsx(DialogTitle, { children: "Manage Columns" }), _jsxs(DialogContent, { children: [columns.map(c => (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: c.visible, onChange: () => dispatch(toggleColumnVisibility(c.key)) }), label: `${c.label} (${c.key})` }, c.key))), _jsxs(Box, { sx: { mt: 2 }, children: [_jsx(TextField, { label: "Key", value: newKey, onChange: (e) => setNewKey(e.target.value), size: "small", sx: { mr: 1 } }), _jsx(TextField, { label: "Label", value: newLabel, onChange: (e) => setNewLabel(e.target.value), size: "small" }), _jsx(Button, { onClick: handleAdd, variant: "contained", sx: { ml: 1 }, children: "Add Field" })] })] }), _jsx(DialogActions, { children: _jsx(Button, { onClick: onClose, children: "Close" }) })] }));
}
