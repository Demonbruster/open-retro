'use client'

import { auth } from '@/config/firebaseConfig';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return user;
};

export default useFirebaseAuth;
