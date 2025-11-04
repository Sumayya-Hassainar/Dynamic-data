import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
export default function ThemeToggle({ dark, setDark }) {
    return (_jsx(IconButton, { onClick: () => setDark(!dark), color: "inherit", children: dark ? _jsx(Brightness7Icon, {}) : _jsx(Brightness4Icon, {}) }));
}
