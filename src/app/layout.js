"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from "react-redux";
import { store } from "../store/store";
import PersistProvider from "../store/persist";
export default function RootLayout({ children, }) {
    return (_jsx("html", { lang: "en", children: _jsx("body", { children: _jsx(Provider, { store: store, children: _jsx(PersistProvider, { children: children }) }) }) }));
}
