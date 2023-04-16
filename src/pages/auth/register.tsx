import { NextPage } from "next";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import Navbar from "~/Components/Navbar";
import Footer from "~/Components/Footer";

const RegisterPage: NextPage = () => {
  return (
    <div>
      <div className="container mx-auto font-light">
        <div className="flex font-light">
          {/* LEFT SIDE */}
          <div className="mx-auto my-auto min-w-min max-w-sm">
            {/* FORM */}
            <form className="ml-32 mt-24 border-stone-800">
              <h1 className="text-4xl tracking-wide">Sign up</h1>
              <p className="pb-5 pt-2 text-lg">
                Already have an account?{" "}
                <Link className="text-blue-500" href={"/auth/login"}>
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

              <button className="duration-1500 mt-10 w-96 rounded-[10px] border border-black bg-black px-7 py-1.5 text-white transition-all hover:bg-white hover:text-black">
                Sign up
              </button>

              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 flex-shrink">OR</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>

              <button className=" duration-1500 transition-al flex w-96 justify-center rounded-[10px] border px-7 py-1.5 font-[500] hover:bg-gray-100">
                <GitHubIcon className="pr-2" sx={{ fontSize: 30 }} />
                <p className="pt-1"> Continue with GitHub</p>
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
