import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Hamburger from "hamburger-react";

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: sessionData } = useSession();

  return (
    <nav className="mt-9 flex p-6">
      <h1 className="">
        <Link href="/" className="text-3xl font-bold ">
          flipassist
        </Link>
      </h1>

      <div className="ml-auto flex">
        <div>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="absolute right-5 top-14 z-50 block text-gray-700 md:hidden"
          >
            <Hamburger size={25} toggled={isOpen} toggle={setIsOpen} />
          </button>
        </div>

        {sessionData ? (
          <div className="">
            {/* DESKTOP SIGNED IN */}
            <div className="hidden md:block">
              <button>
                <Link
                  className={`duration-1500 rounded-lg border border-black px-6 py-3 transition-all hover:scale-110 hover:bg-black hover:text-white`}
                  href="/content/dashboard"
                >
                  Dashboard
                </Link>
              </button>
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

            {/* MOBILE SIGNED IN */}
            <div
              className={`absolute right-2 top-[110px] block rounded-lg bg-white shadow-lg md:hidden ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <Link
                className="top-rounded-button mx-auto block w-full px-4 py-2 text-gray-800 hover:bg-gray-200"
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
                className="bottom-rounded-button mx-auto block w-full px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* DESKTOP SIGNED OUT */}
            <div className="hidden md:block">
              <button
                onClick={() => {
                  signIn("google", {
                    callbackUrl: "/content/dashboard/",
                  }).catch((e) => {
                    console.error(e);
                  });
                }}
                className="duration-1500 hidden rounded-lg border border-black px-6 py-2 transition-all hover:scale-110 hover:bg-black hover:text-white md:block"
              >
                Sign In
              </button>
            </div>

            {/* MOBILE SIGNED OUT */}
            <div
              className={`absolute right-4 top-[110px] block w-28 rounded-lg bg-white shadow-lg md:hidden ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <button
                onClick={() => {
                  signIn("google", {
                    callbackUrl: "/content/dashboard/",
                  }).catch((e) => {
                    console.error(e);
                  });
                }}
                className="mx-auto block w-full px-4 py-2 text-gray-800 hover:rounded-lg hover:bg-gray-200"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
