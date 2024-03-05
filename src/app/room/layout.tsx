'use client'

import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import Providers from "./providers";
import useAuth from "@/context/AuthContext";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AppBar position="static" color="primary" enableColorOnDark>
        <ToolbarHandle />
      </AppBar>
      <Container component="main">
        {children}
      </Container>
    </Providers>
  );
}


const ToolbarHandle = () => {
  const router = useRouter();
  const { user } = useAuth()
  const loggedUser = useMemo(() => Boolean(user), [user])

  const handleAuth = () => {
    if (loggedUser)
      signOut()
    else
      router.push('/auth')
  }

  return <Toolbar>
    <Typography variant="h6" noWrap component="button" sx={{ flexGrow: 1 }} onClick={handleAuth}>
      {loggedUser ? "Log out" : "Login"}
    </Typography>
    {/* <Button variant="outlined"  onClick={handleAuth} >
      {loggedUser ? "Log out" : "Login"}
    </Button> */}
  </Toolbar>
}