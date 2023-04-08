import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const RegisterPage: NextPage = () => {
  const handleSignIn = () => {
    signIn();
    // Use NextAuth's signIn() function to initiate the authentication flow
  };

  return (
    <div className="mb-10 flex font-poppins font-[300]">
      {/* LEFT SIDE */}
      <div className="mx-auto my-auto min-w-min max-w-sm">
        {/* FORM */}
        <form className="ml-32 mt-24 border-stone-800">
          <h1 className="text-4xl tracking-wide">Sign up</h1>
          <p className="pb-5 pt-2 text-lg">
            Already have an account?{" "}
            <Link className="text-blue-500" href={"/login"}>
              Sign in.
            </Link>
          </p>

          <div className="flex gap-20">
            <div className="">
              <p className="py-2 font-[500]">First Name</p>
              <input className="w-[150px] rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"></input>
            </div>
            <div className="">
              <p className="py-2 font-[500]">Last Name</p>
              <input className="w-[150px] rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"></input>
            </div>
          </div>

          <p className="py-2 font-[500]">Email</p>
          <input className="w-96 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"></input>
          <p className="py-2 font-[500]">Password</p>
          <input
            type="password"
            className="w-96 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"
          ></input>
          <p className="py-2 font-[500]">Confirm Password</p>
          <input
            type="password"
            className="w-96 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"
          ></input>

          <button
            onClick={handleSignIn}
            className="duration-1500 mt-10 w-96 rounded-[10px] border border-black bg-black px-7 py-1.5 text-white transition-all hover:bg-white hover:text-black"
          >
            Sign up
          </button>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <button
            onClick={handleSignIn}
            className=" duration-1500 transition-al flex w-96 justify-center rounded-[10px] border px-7 py-1.5 font-[500] hover:bg-gray-100"
          >
            <FontAwesomeIcon className="w-7 pr-2" icon={faGithub} />
            Continue with GitHub
          </button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4"></div>
    </div>
  );
};

export default RegisterPage;
