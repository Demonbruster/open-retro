import React, { createContext, useContext, useMemo } from "react";
import { GoogleAuthProvider, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/auth";
import { NEXT_PUBLIC_ADMIN_EMAIL } from "@/constants";

interface IAuthCtx {
  isAdmin: boolean
  user: false | null | User
}

const initialData: IAuthCtx = {
  isAdmin: false,
  user: false
}

const provider = new GoogleAuthProvider();

const authCtx = createContext(initialData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useUser();
  const isAdmin = useMemo(() => Boolean(user && user?.email === NEXT_PUBLIC_ADMIN_EMAIL), [user]);

  if (user === false)
  return <>Loading...</>
  
  if (!user)
    router.push('/auth')


  return (
    <authCtx.Provider value={{
      isAdmin,
      user
    }}> {children} </authCtx.Provider>
  )
}

export default function useAuth() {
  const ctx = useContext(authCtx)
  if (!ctx) throw new Error('useAuth must be used within the AuthProvider')
  return ctx;
}


