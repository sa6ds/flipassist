import { type NextPage } from "next";
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

export async function getServerSideProps(context: any) {
  interface Session {
    email: string;
    name: string;
    image: string;
  }

  return requireAuthentication(context, (session: Session) => {
    return {
      props: { currentSession: session },
    };
  });
}
