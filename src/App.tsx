"use client";
import  { useState } from "react";
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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>Dynamic Data Table</Typography>
              <ThemeToggle dark={dark} setDark={setDark}/>
              <Button color="inherit" onClick={()=>setModalOpen(true)}>Manage Columns</Button>
            </Toolbar>
          </AppBar>
          <Container sx={{ mt: 4 }}>
            <CsvImportExport />
            <DataTable />
            <ManageColumnsModal open={modalOpen} onClose={() => setModalOpen(false)} />
          </Container>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
