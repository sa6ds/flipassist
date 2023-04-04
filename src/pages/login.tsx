import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginPage: NextPage = () => {
  const handleSignIn = () => {
    // Use NextAuth's signIn() function to initiate the authentication flow
  };

  return (
    <div className="container mx-auto flex w-[100vw] p-6 font-inter font-[300]">
      {/* LEFT SIDE */}
      <div className="flex w-2/3  border-red-800">
        {/* FORM */}
        <form className="ml-28 mt-36 border-stone-800">
          <h1 className="text-4xl tracking-wide">Welcome Back!</h1>
          <p className="pb-5 pt-4 text-lg">
            New to flipassist?{" "}
            <Link className="text-blue-500" href={"/register"}>
              Sign up for an account
            </Link>
          </p>
          <p className="pb-1">Email:</p>
          <input className="w-96 rounded-lg border border-black bg-gray-100 px-3 py-2"></input>
          <p className="pb-1 pt-2">Password:</p>
          <input
            type="password"
            className="w-96 rounded-lg border border-black bg-gray-100 px-3 py-2"
          ></input>
          <div className="flex">
            <div className="flex">
              <input
                type="checkbox"
                className="mr-1 mt-2 flex items-center justify-center "
              ></input>
              <p className="mt-3 text-sm">Remember me for 30 days</p>
            </div>
            <p className="ml-auto mt-3 text-sm">Forgot my Password</p>
          </div>
          <button
            onClick={handleSignIn}
            className="duration-1500 mt-10 rounded-[10px] border border-black bg-black px-7 py-2 text-white transition-all hover:bg-white hover:text-black"
          >
            Sign In
          </button>
        </form>
      </div>
      {/* RIGHT SIDE */}
      <div className="w-1/3 border"></div>
    </div>
  );
};

export default LoginPage;
