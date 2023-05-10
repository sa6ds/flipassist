import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { requireAuthentication } from "~/utils/requireAuthentication";
import type { GetServerSideProps } from "next";

function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex">
      <h1 className="mt-3">
        <Link href="/" className="text-2xl font-medium sm:text-3xl lg:text-4xl">
          flipassist
        </Link>
      </h1>

      <div className="ml-auto flex py-2">
        {sessionData ? (
          <div>
            <Link
              className={`duration-1500 rounded-lg border border-black px-2 py-2 transition-all hover:scale-110 hover:bg-black hover:text-white sm:px-6 sm:py-3`}
              href="/content/dashboard"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                signOut().catch((e) => {
                  console.error(e);
                });
              }}
              className="duration-1500 border-black px-2 py-2 sm:px-6 sm:py-3"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              signIn("google", {
                callbackUrl: "/content/dashboard/",
              }).catch((e) => {
                console.error(e);
              });
            }}
            className="duration-1500 rounded-lg border border-black px-6 py-2 transition-all hover:scale-110 hover:bg-black hover:text-white"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await requireAuthentication(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentSession: session,
    },
  };
};
