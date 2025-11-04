import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, TextField, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleColumnVisibility, addColumn, setColumns } from "../slices/tableSlice";
import { ColumnDef } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function ManageColumnsModal({ open, onClose }: { open: boolean; onClose: ()=>void }) {
  const dispatch = useDispatch();
  const columns = useSelector((s: RootState) => s.table.columns);
  const [newKey, setNewKey] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const handleAdd = () => {
    if (!newKey.trim()) return alert("Key required");
    const col: ColumnDef = { key: newKey.trim(), label: newLabel || newKey.trim(), visible: true };
    dispatch(addColumn(col));
    setNewKey(""); setNewLabel("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        {columns.map(c => (
          <FormControlLabel
            key={c.key}
            control={<Checkbox checked={c.visible} onChange={() => dispatch(toggleColumnVisibility(c.key))} />}
            label={`${c.label} (${c.key})`}
          />
        ))}
        <Box sx={{ mt: 2 }}>
          <TextField label="Key" value={newKey} onChange={(e)=>setNewKey(e.target.value)} size="small" sx={{mr:1}} />
          <TextField label="Label" value={newLabel} onChange={(e)=>setNewLabel(e.target.value)} size="small" />
          <Button onClick={handleAdd} variant="contained" sx={{ ml: 1 }}>Add Field</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
