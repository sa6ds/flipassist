import type { GetServerSideProps, NextPage } from "next";
import Sidebar from "../../Components/Sidebar";
import Header from "~/Components/Header";
import { requireAuthentication } from "~/utils/requireAuthentication";
import Footer from "~/Components/Footer";
import WorkInProgress from "~/Components/WorkInProgress";
import Head from "next/head";

const Calculators: NextPage = () => {
  return (
    <div className="min-h-[100vh]">
      <Head>
        <title>Calculators | flipassist</title>
        <meta
          name="description"
          content="Calculate fees for popular selling platforms like StockX, GOAT, Grailed, and more. Optimize your profits with our fee calculators for hassle-free selling."
        />
      </Head>
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Calculators" />

        <div className="mx-8 my-8">
          <WorkInProgress />
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
    </div>
  );
};

export default Calculators;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await requireAuthentication(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentSession: session,
    },
  };
};
