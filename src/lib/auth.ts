import { useEffect, useState } from "react";
import { signInWithRedirect, User as FirebaseUser, signOut as firebaseSignOut, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

const provider = new GoogleAuthProvider();

export async function signIn(email: string, password: string, rememberMe: boolean = false) {
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  await setPersistence(auth, browserSessionPersistence);
  signInWithRedirect(auth, provider)
}

export function signOut() {
  return firebaseSignOut(auth);
}

export function useUser() {
  const [user, setUser] = useState<FirebaseUser | null | false>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));

    return () => unsubscribe()
  }, []);

  return user;
}