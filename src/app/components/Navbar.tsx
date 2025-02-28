"use client";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../Firebase";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

function Navbar() {
  const router = useRouter();

  // Initialize user state with the current user from Firebase auth
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        // Initialize new user data
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          isPro: false,
          products: [], // Initialize empty products array
          lastLogin: new Date().toISOString(),
        };
        await setDoc(doc(db, "users", user.uid), userData);
      } else {
        // Update last login for existing users
        await updateDoc(doc(db, "users", user.uid), {
          lastLogin: new Date().toISOString(),
        });
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-12">
      <header className="flex w-full">
        <div className="flex flex-row items-center">
          <Link href="/" className="flex flex-row items-center">
            <div className="bg-purple-500 p-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="white"
                className="bi bi-box-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
                />
              </svg>
            </div>
            <h1 className="text-slate-900 px-4 font-bold tracking-tighter text-2xl my-auto">
              flipassist
            </h1>
          </Link>
        </div>
        <div className="my-auto ml-auto">
          {user ? (
            <div>
              <Link
                href="dashboard"
                className="font-medium text-purple-500 hover:bg-purple-50 px-3 py-2 hover:rounded-xl"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-900 font-medium hover:text-purple-500 hover:bg-purple-50 px-3 py-2 hover:rounded-xl"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="text-slate-900 font-medium hover:text-purple-500 hover:bg-purple-50 px-3 py-2 hover:rounded-xl"
            >
              Login
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
