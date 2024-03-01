'use client';

import { GlobalProvider } from "@/context/GlobalContext";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const defaultTheme = createTheme();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalProvider>
        <CssBaseline />
        {children}
      </GlobalProvider>
    </ThemeProvider>
  );
}