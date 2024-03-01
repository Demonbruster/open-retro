import type { Metadata } from "next";
import { Inter } from "next/font/google";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open retro",
  description: "Get feedback on our monthly it.society@kinniya meeting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container component="main">
          {children}
        </Container>
      </body>
    </html>
  );
}
