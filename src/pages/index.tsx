import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import placeholderImg from "../../public/placeholder_img.png";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto p-6 font-inter font-[300]">
      <nav className="flex">
        <h1 className="logo text-5xl">flipassist</h1>
        <div className="ml-auto flex">
          <Link href="/login" className="mr-6 mt-2">
            Login
          </Link>
          <Link
            href="/register"
            className=" duration-1500 rounded-lg border border-black px-8 py-2 transition-all hover:scale-110 hover:bg-black hover:text-white"
          >
            Register
          </Link>
        </div>
      </nav>

      <div className="flex">
        <div className="flex flex-col justify-center">
          <h1 className="pb-2 pt-64 text-5xl">Reselling Simplified</h1>
          <p className="w-[650px] pt-4 text-2xl">
            Elevate your reselling game with advanced tools, inventory tracking,
            and more.
          </p>
        </div>
        <Image
          className="ml-auto w-96"
          src={placeholderImg}
          alt="App Preview"
        />
      </div>
    </div>
  );
};

export default Home;
