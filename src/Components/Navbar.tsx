import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { requireAuthentication } from "~/utils/requireAuthentication";

function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex">
      <h1 className="logo mt-4 text-5xl font-bold">
        <Link href="/" className="font-bold">
          flipassist
        </Link>
      </h1>
      <div className="ml-auto flex py-2">
        {sessionData && (
          <Link
            className={`duration-1500 rounded-lg border border-black px-6 py-2 transition-all hover:scale-110 hover:bg-black hover:text-white`}
            href="/content/dashboard"
          >
            Dashboard
          </Link>
        )}
        <button
          className={`duration-1500 rounded-lg border border-black px-8 py-2 ${
            sessionData
              ? "border-0 text-black"
              : "transition-all hover:scale-110 hover:bg-black hover:text-white"
          }`}
          onClick={
            sessionData
              ? () => {
                  signOut();
                }
              : () => {
                  signIn("google", {
                    callbackUrl: "/content/dashboard",
                  });
                }
          }
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

export async function getServerSideProps(context: any) {
  interface Session {
    email: string;
    name: string;
    image: string;
  }

  const session = await requireAuthentication(context);

  return {
    props: { currentSession: session as Session },
  };
}
