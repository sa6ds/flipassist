import type { GetServerSideProps, NextPage } from "next";
import Sidebar from "../../Components/Sidebar";
import Header from "~/Components/Header";
import { requireAuthentication } from "~/utils/requireAuthentication";
import Footer from "~/Components/Footer";
import PageHead from "~/utils/PageHead";

const Tools: NextPage = () => {
  return (
    <div className="min-h-[100vh]">
      <PageHead title="flipassist | Tools" />
      <div className="flex truncate font-light">
        <Sidebar />
        <div className="w-full md:ml-[250px]">
          <Header pageTitle="Tools" />
          <div></div>
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
