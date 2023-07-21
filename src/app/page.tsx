"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "./Firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/inventory");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-grid-gray-200 min-h-screen">
      <div className="bg-gradient-to-b from-transparent to-slate-50 min-h-screen">
        <Navbar />
        <main className=" container mx-auto px-8">
          <div className="mt-16 lg:mt-28 lg:text-center lg:mx-5">
            {/* Introduction */}
            <div className="relative z-50">
              <h1 className="text-slate-900 z-50 pb-8 tracking-tighter text-3xl md:text-4xl lg:text-6xl font-bold">
                Streamline Your Reselling Game with Our Comprehensive Toolkit.
              </h1>
              <p className="z-50 text-lg lg:text-xl lg:mx-24 mb-16">
                Effortlessly manage inventory and simplify operations for
                efficient reselling success.
              </p>

              {user ? (
                <Link href="/inventory">
                  <button
                    id="cta-button"
                    className="w-fit px-6 py-3 border-2 animate-background-shine border-purple-600 bg-[linear-gradient(110deg,#9533F5,45%,#B468E3,55%,#9533F5)] bg-[length:200%_100%] shadow-3xl shadow-purple-500/30 hover:shadow-purple-500/60 rounded-2xl"
                  >
                    <h3 className="text-lg font-medium text-white text-center">
                      Try flipassist for Lifetime deal $19
                    </h3>
                    <p className="text-sm font-normal text-white/80 text-center">
                      20% off for the first 100 users
                    </p>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  id="cta-button"
                  className="w-fit px-6 py-3 border-2 animate-background-shine border-purple-600 bg-[linear-gradient(110deg,#9533F5,45%,#B468E3,55%,#9533F5)] bg-[length:200%_100%] shadow-3xl shadow-purple-500/30 hover:shadow-purple-500/60 rounded-2xl"
                >
                  <h3 className="text-lg font-medium text-white text-center">
                    Try flipassist for Lifetime deal $19
                  </h3>
                  <p className="text-sm font-normal text-white/80 text-center">
                    20% off for the first 100 users
                  </p>
                </button>
              )}

              {/* Background elements */}
              {/* <div className="-z-10 absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 md:w-[650px] md:h-[400px] bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 from-yellow-500 via-orange-500 to-pink-500 rounded-full mix-blend-multiply blur-3xl filter opacity-40" />
            <div className="-z-10 absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-96 h-96 md:w-[650px] md:h-[400px] bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 from-yellow-500 via-orange-500 to-pink-500 rounded-full mix-blend-multiply blur-3xl filter opacity-40" /> */}
            </div>
          </div>
        </main>
        <div className="container mx-auto sticky top-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
