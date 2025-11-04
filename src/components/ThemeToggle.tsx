import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggle({ dark, setDark }: { dark: boolean; setDark: (v:boolean)=>void }) {
  return (
    <IconButton onClick={() => setDark(!dark)} color="inherit">
      {dark ? <Brightness7Icon/> : <Brightness4Icon/>}
    </IconButton>
  );
}
