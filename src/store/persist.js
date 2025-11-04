"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
export default function PersistProvider({ children, }) {
    return (_jsx(PersistGate, { loading: null, persistor: persistor, children: children }));
}
