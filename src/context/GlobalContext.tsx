import React, { createContext, useContext, useEffect, useState } from "react";
import { fireStoreDB } from "@/config/firebaseConfig";
import { IRoom } from "@/lib/types";
import { collection, getDocs, query } from "firebase/firestore";

interface IGlobalContext {
  rooms: IRoom[]
}

const initialData: IGlobalContext = {
  rooms: []
}

const gblCtx = createContext(initialData);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    getDocs(query(collection(fireStoreDB, 'room'))).then((res) => {
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
      rooms
    }}> {children} </gblCtx.Provider>
  )
}

export default function useGlobalCtx() {
  const ctx = useContext(gblCtx)
  if (!ctx) throw new Error('useGlobalCtx must be used within the AuthProvider')
  return ctx;
}
