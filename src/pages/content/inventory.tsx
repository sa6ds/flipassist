import Sidebar from "../../Components/Sidebar";
import Header from "~/Components/Header";
import { requireAuthentication } from "~/utils/requireAuthentication";

import type { GetServerSideProps, NextPage } from "next";


const Inventory: NextPage = () => {
  return (
    <div>
      <div className="flex truncate font-light">
        <Sidebar />
        <div className="w-full md:ml-[300px]">
          <Header pageTitle="Inventory" />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

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
