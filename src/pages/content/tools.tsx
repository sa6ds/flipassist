import type { GetServerSideProps, NextPage } from "next";
import Sidebar from "../../Components/Sidebar";
import Header from "~/Components/Header";
import { requireAuthentication } from "~/utils/requireAuthentication";
import Footer from "~/Components/Footer";
import WorkInProgress from "~/Components/WorkInProgress";
import Head from "next/head";

const Tools: NextPage = () => {
  return (
    <div className="min-h-[100vh]">
      <Head>
        <title>Tools | flipassist</title>
        <meta
          name="description"
          content="Enhance your productivity with our versatile tools page. Access useful utilities like address jigger, size converter, and Gmail dot trick to simplify your daily tasks."
        />
      </Head>
      {/* <PageHead title="flipassist | Tools" /> */}
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Tools" />

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

export default Tools;

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
