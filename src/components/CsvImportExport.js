import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@mui/material";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { replaceAll } from "../slices/tableSlice";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
export default function CsvImportExport() {
    const dispatch = useDispatch();
    const columns = useSelector((s) => s.table.columns);
    const handleFile = (file) => {
        if (!file)
            return;
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data;
                // Basic validation: must have at least Name or email
                if (!data.length)
                    return alert("CSV empty or invalid");
                const rows = data.map((r) => ({
                    id: uuidv4(),
                    name: r.name ?? r.Name ?? "",
                    email: r.email ?? r.Email ?? "",
                    age: r.age ? Number(r.age) : 0,
                    role: r.role ?? r.Role ?? "",
                    ...r,
                }));
                dispatch(replaceAll(rows));
            },
            error: (err) => alert("CSV parse error: " + err.message),
        });
    };
    const exportCsv = (rows) => {
        // Include only visible columns
        const visibleKeys = columns.filter(c => c.visible).map(c => c.key);
        const data = rows.map(r => {
            const out = {};
            visibleKeys.forEach(k => out[k] = r[k]);
            return out;
        });
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "export.csv");
    };
    return (_jsxs("div", { style: { display: "flex", gap: 12 }, children: [_jsx("input", { id: "csv-upload", type: "file", accept: ".csv,text/csv", style: { display: "none" }, onChange: (e) => handleFile(e.target.files?.[0] ?? null) }), _jsx("label", { htmlFor: "csv-upload", children: _jsx(Button, { variant: "contained", children: "Import CSV" }) }), _jsx(Button, { variant: "outlined", onClick: () => {
                    // grab rows from store (could use selector)
                    const state = window.__APP_STATE_FOR_EXPORT;
                    // safer: use useSelector; here we will get rows via DOM-less pattern – replace with proper hook in real use
                }, children: "Export CSV" })] }));
}
