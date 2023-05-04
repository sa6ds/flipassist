import { type NextPage } from "next";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useState } from "react";
import Header from "~/Components/Header";

const Tools: NextPage = () => {
  const [users, setUsers] = useState({ name: "" });

  useEffect(() => {
    setUsers({
      name: "saad",
    });
  }, []);

  return (
    <div>
      <div className="flex truncate font-light">
        <Sidebar name={users.name} />
        <div className="w-full md:ml-[300px]">
          <Header pageTitle="Tools" />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
