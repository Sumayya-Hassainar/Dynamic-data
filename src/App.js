"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import DataTable from "../src/components/DataTable";
import ManageColumnsModal from "./components/ManageColumsModal";
import CsvImportExport from "../src/components/CsvImportExport";
import ThemeToggle from "../src/components/ThemeToggle";
import { Provider } from "react-redux";
import { store, persistor } from "../src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export default function Page() {
    const [modalOpen, setModalOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const theme = createTheme({ palette: { mode: dark ? "dark" : "light" } });
    return (_jsx(Provider, { store: store, children: _jsx(PersistGate, { loading: null, persistor: persistor, children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(AppBar, { position: "static", children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", sx: { flexGrow: 1 }, children: "Dynamic Data Table" }), _jsx(ThemeToggle, { dark: dark, setDark: setDark }), _jsx(Button, { color: "inherit", onClick: () => setModalOpen(true), children: "Manage Columns" })] }) }), _jsxs(Container, { sx: { mt: 4 }, children: [_jsx(CsvImportExport, {}), _jsx(DataTable, {}), _jsx(ManageColumnsModal, { open: modalOpen, onClose: () => setModalOpen(false) })] })] }) }) }));
}
