import { NextPage } from "next";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useState } from "react";
import Header from "~/Components/Header";

const Inventory: NextPage = () => {
  const [users, setUsers] = useState({ name: "" });

  useEffect(() => {
    setUsers({
      name: "saad",
    });
  }, []);

  return (
    <div className="font-poppins flex truncate font-[500]">
      <Sidebar name={users.name} />
      <div className="w-full">
        <Header pageTitle="Inventory" />
      </div>
    </div>
  );
};

export default Inventory;
