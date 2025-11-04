"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import tableReducer from "../slices/tableSlice";
const rootReducer = combineReducers({
    table: tableReducer,
});
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["table"], // persist only table slice
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // redux-persist uses non-serializable values internally
    }),
});
export const persistor = persistStore(store);
