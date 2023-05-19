import type { GetServerSideProps, NextPage } from "next";
import Sidebar from "../../Components/Sidebar";
import Header from "~/Components/Header";
import { requireAuthentication } from "~/utils/requireAuthentication";

const Tools: NextPage = () => {
  return (
    <div>
      <div className="flex truncate font-light">
        <Sidebar />
        <div className="w-full md:ml-[300px]">
          <Header pageTitle="Tools" />
          <div></div>
        </div>
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
