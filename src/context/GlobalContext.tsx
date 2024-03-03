import React, { createContext, useContext, useEffect, useState } from "react";
import useFirebaseAuth from "./firebaseAuth";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, fireStoreDB } from "@/config/firebaseConfig";
import { IRoom } from "@/lib/types";
import { collection, getDocsFromServer, query } from "firebase/firestore";

interface IGlobalContext {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  rooms: IRoom[]
}

const initialData: IGlobalContext = {
  user: null,
  setUser: () => { },
  rooms: []
}


const gblCtx = createContext(initialData);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getDocsFromServer(query(collection(fireStoreDB, 'room'))).then((res) => {
      const dd: IRoom[] = res.docs.map(val => {
        const data = val.data() as IRoom

        return ({
          ...data,
          id: val.id,
        }) as IRoom
      })
      setRooms(dd);
    })
  }, [])

  return (
    <gblCtx.Provider value={{
      user,
      setUser,
      rooms
    }}> {children} </gblCtx.Provider>
  )
}

export default function useGlobalCtx() {
  const ctx = useContext(gblCtx)
  if (!ctx) throw new Error('useGlobalCtx must be used within the AuthProvider')
  return ctx;
}


