import React, { createContext, useContext } from "react";
import useFirebaseAuth from "./firebaseAuth";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

interface IGlobalContext {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const initialData: IGlobalContext = {
  user: null,
  setUser: () => { }
}


const gblCtx = createContext(initialData);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user:', user)
      setUser(user);
    });
  }, []);


  console.log("user", user)

  return (
    <gblCtx.Provider value={{
      user,
      setUser
    }}> {children} </gblCtx.Provider>
  )
}

export default function useGlobalCtx() {
  const ctx = useContext(gblCtx)
  if (!ctx) throw new Error('useGlobalCtx must be used within the AuthProvider')
  return ctx;
}


