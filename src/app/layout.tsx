"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store"
import PersistProvider from "../store/persist";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistProvider>{children}</PersistProvider>
        </Provider>
      </body>
    </html>
  );
}
