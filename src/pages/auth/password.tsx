import { NextPage } from "next";
import Link from "next/link";

const PasswordPage: NextPage = () => {
  return (
    <div className="font-light md:flex">
      {/* LEFT SIDE */}
      <div className="mx-auto my-auto w-full py-4 md:w-[500px]">
        {/* FORM */}
        <form className="mt-24 flex w-full flex-col border-stone-800 px-12 md:px-6">
          <h1 className="text-3xl tracking-wide">Forgot your password?</h1>
          <p className="pb-5 pt-2 text-lg">
            Remember your password?{" "}
            <Link className="text-blue-500" href={"/auth/login"}>
              Sign in.
            </Link>
          </p>

          <p className="py-2 font-[500]">Email</p>
          <input className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"></input>

          <button className="duration-1500 mt-10 w-full rounded-[10px] border border-black bg-black px-7 py-1.5 text-white transition-all hover:bg-white hover:text-black">
            Send Password Reset Link
          </button>
        </form>
      </div>
      {/* RIGHT SIDE */}
      <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4"></div>
    </div>
  );
};

export default PasswordPage;
