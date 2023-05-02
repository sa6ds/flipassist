import { type NextPage } from "next";
import Image from "next/image";
import placeholderImg from "../assets/images/placeholder_img.png";
import Footer from "~/Components/Footer";
import Navbar from "~/Components/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <div className="container mx-auto max-w-7xl p-6 pb-48 font-light">
        <Navbar />
        <pre>
          <a href="content/dashboard">secret door</a>
        </pre>

        <div className="mt-12 inline text-center lg:mt-28 lg:flex lg:text-left">
          <div className="mb-12 mt-12 flex flex-col lg:mt-48 lg:flex lg:text-left">
            <h1 className="mb-2 mt-12 text-4xl lg:mt-36 lg:text-5xl">
              Reselling Simplified
            </h1>
            <p className="mt-4 text-xl md:text-2xl lg:w-[650px]">
              Elevate your reselling game with advanced tools, inventory
              tracking, and more.
            </p>
          </div>
          <Image
            className="mx-auto w-72 md:w-80 lg:mx-0 lg:ml-auto lg:w-[350px] "
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
