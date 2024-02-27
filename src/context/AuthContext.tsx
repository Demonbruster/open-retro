import React, { createContext, useContext, useState } from "react";

interface IAuthCtx {
  isAdmin: boolean
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const initialData: IAuthCtx = {
  isAdmin: false,
  setIsAdmin: () => { }
}

const authCtx = createContext(initialData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  return (
    <authCtx.Provider value={{
      isAdmin,
      setIsAdmin
    }}> {children} </authCtx.Provider>
  )
}

export default function useAuth() {
  const ctx = useContext(authCtx)
  if (!ctx) throw new Error('useAuth must be used within the AuthProvider')
  return ctx;
}


