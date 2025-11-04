import React, { useState } from "react";
import { TableCell, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {
  row: any;
  field: string;
  originalValue: any;
  onStage: (patch: any) => void;
};

export default function EditableCell({ row, field, originalValue, onStage }: Props) {
  const editedRows = useSelector((s: RootState) => s.table.editedRows);
  const staged = editedRows[row.id]?.[field];
  const value = staged !== undefined ? staged : originalValue;

  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value ?? "");

  React.useEffect(()=> setLocal(value ?? ""), [value]);

  const commit = () => {
    // Basic validation for age
    if (field === "age") {
      const num = Number(local);
      if (Number.isNaN(num)) { alert("Age must be a number"); return; }
      onStage({ [field]: num });
    } else {
      onStage({ [field]: local });
    }
    setEditing(false);
  };

  return (
    <TableCell onDoubleClick={() => setEditing(true)}>
      {editing ? (
        <TextField
          value={local}
          size="small"
          onChange={(e) => setLocal(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
          autoFocus
        />
      ) : (
        <span>{value}</span>
      )}
    </TableCell>
  );
}
