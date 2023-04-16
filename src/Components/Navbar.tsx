import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex">
      <h1 className="logo text-5xl font-bold">
        <Link href="/" className="font-bold">
          flipassist
        </Link>
      </h1>
      <div className="ml-auto flex">
        <Link href="/auth/login" className="mr-6 mt-2">
          Login
        </Link>
        <Link
          href="/auth/register"
          className=" duration-1500 rounded-lg border border-black px-8 py-2 transition-all hover:scale-110 hover:bg-black hover:text-white"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
