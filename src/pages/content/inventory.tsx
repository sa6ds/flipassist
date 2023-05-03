import { NextPage } from "next";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useState } from "react";
import Header from "~/Components/Header";
import Footer from "~/Components/Footer";

const Inventory: NextPage = () => {
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
          <Header pageTitle="Inventory" />
          <div>yo</div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
