import { NextPage } from "next";
import Link from "next/link";

const PasswordPage: NextPage = () => {
  return (
    <div className="flex text-base font-light">
      {/* LEFT SIDE */}
      <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4">
        {/* FORM */}
        <form className="ml-32 mt-24 border-stone-800">
          <h1 className="text-3xl tracking-wide">Forgot your password?</h1>
          <p className="mt-2 pb-5 text-lg">Get back your account.</p>
          <p className="py-2 font-[500]">Email</p>
          <input className="w-96 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5"></input>

          <button className="duration-1500 mt-10 w-96 rounded-[10px] border border-black bg-black px-7 py-1.5 text-white transition-all hover:bg-white hover:text-black">
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
