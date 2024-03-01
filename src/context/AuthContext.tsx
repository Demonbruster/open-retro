import React, { createContext, useContext, useState } from "react";
import useFirebaseAuth from "./firebaseAuth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";
import useGlobalCtx from "./GlobalContext";

interface IAuthCtx {
  isAdmin: boolean
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const initialData: IAuthCtx = {
  isAdmin: false,
  setIsAdmin: () => { }
}

const provider = new GoogleAuthProvider();

const authCtx = createContext(initialData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useGlobalCtx();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  console.log("user", user)

  // if (!user) {
  //   router.push('/auth')
  // }

  // if (!(user || isAdmin)) {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       if (!credential) return;
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log(token + ", " + user.email);
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     }).catch((error) => {
  //       console.log('error: ', error)
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });

  //   return <> waiting to complete login via gmail account! </>
  // }

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


