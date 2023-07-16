import { type NextPage } from "next";
import Image from "next/image";
import placeholderImg from "../assets/images/placeholder_img.png";
import Footer from "~/Components/Footer";
import Navbar from "~/Components/Navbar";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="min-h-[100vh]">
      <Head>
        <title>flipassist</title>
        <meta
          name="description"
          content="Elevate your reselling game with advanced tools, inventory tracking, and more."
        />
      </Head>
      <div className="container mx-auto max-w-7xl pb-48">
        <Navbar />
        <div className="mt-12 inline text-center lg:flex lg:text-left">
          <div className="mt-10 px-10 lg:mt-auto lg:text-left xl:mx-0">
            <h1 className="mb-2 text-4xl lg:text-5xl">Reselling Simplified</h1>
            <p className="mt-5 text-xl md:text-2xl lg:w-[650px]">
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
      <div className="sticky top-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
