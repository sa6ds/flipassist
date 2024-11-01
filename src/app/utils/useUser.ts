import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useUser() {
  const [user, setUser] = useState<User | null | false>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
} 