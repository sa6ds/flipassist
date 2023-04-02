import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import placeholderImg from "../../public/placeholder_img.png";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <div className=" container mx-auto w-[100vw] p-6">
        <div className="flex">
          <h1 className="logo text-5xl">flipassist</h1>
          <div className="ml-auto flex">
            <Link href="/login" className="mr-6 mt-2">
              Login
            </Link>
            <Link
              href="/register"
              className=" duration-1500 rounded-[10px] border border-black pb-2 pl-10 pr-10 pt-2 transition-all hover:scale-110 hover:bg-black hover:text-white"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col justify-center">
            <h1 className="pt-[250px] text-[45px]">Reselling Simplified</h1>
            <p className="w-[650px] text-[25px]">
              Elevate your reselling game with advanced tools, inventory
              tracking, and more.
            </p>
          </div>
          <Image
            className="ml-auto w-96"
            src={placeholderImg}
            alt="App Preview"
          />
        </div>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
