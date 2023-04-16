import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import placeholderImg from "../../public/placeholder_img.png";
import Footer from "~/Components/Footer";
import Navbar from "~/Components/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <div className="container mx-auto p-6 pb-48 font-light">
        <Navbar />

        <a href="content/dashboard">dashboard</a>
        <div className="flex">
          <div className="flex flex-col justify-center">
            <h1 className="pb-2 pt-64 text-5xl">Reselling Simplified</h1>
            <p className="w-[650px] pt-4 text-2xl">
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

      <Footer />
    </div>
  );
};

export default Home;
