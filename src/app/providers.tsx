'use client';

import { AuthProvider } from "@/context/AuthContext";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const defaultTheme = createTheme();

export default function Providers({ children }: {children: React.ReactNode}) {
  return (
    <ThemeProvider theme={defaultTheme}>
       <CssBaseline />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}