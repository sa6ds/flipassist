import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginPage: NextPage = () => {
  const handleSignIn = () => {
    // Use NextAuth's signIn() function to initiate the authentication flow
  };

  return (
    <div className="flex font-poppins text-base font-[300]">
      {/* LEFT SIDE */}
      <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4">
        {/* FORM */}
        <form className="ml-32 mt-24 border-stone-800">
          <h1 className="text-4xl tracking-wide">Welcome Back!</h1>
          <p className="pb-5 pt-2 text-lg">
            New to flipassist?{" "}
            <Link className="text-blue-500" href={"/register"}>
              Sign up for an account.
            </Link>
          </p>
          <p className="py-2 font-[500]">Email</p>
          <input className="w-96 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"></input>
          <p className="py-2 font-[500]">Password</p>
          <input
            type="password"
            className="mb-2 w-96 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"
          ></input>
          <div className="flex">
            <div className="flex">
              <input
                type="checkbox"
                className="my-auto mr-1 flex cursor-pointer items-center justify-center "
              ></input>
              <p className="my-auto text-sm">Remember me for 30 days</p>
            </div>
            <p className="my-auto ml-auto text-sm">
              {" "}
              <Link className="" href={"/password"}>
                Forgot password?
              </Link>
            </p>
          </div>
          <button
            onClick={handleSignIn}
            className="duration-1500 mt-10 w-96 rounded-[10px] border border-black bg-black px-7 py-1.5 text-white transition-all hover:bg-white hover:text-black"
          >
            Sign in
          </button>
        </form>
      </div>
      {/* RIGHT SIDE */}
      <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4"></div>
    </div>
  );
};

export default LoginPage;
