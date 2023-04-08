import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
useContext;

const DashboardPage: NextPage = () => {
  const [users, setUsers] = useState({ name: "" });

  useEffect(() => {
    setUsers({
      name: "saad",
    });
  }, []);

  return (
    <div className="flex truncate font-poppins font-[500]">
      {/* SIDE BAR */}
      <Sidebar name={users.name} />

      {/* CONTENT */}
      <div>Dashboard</div>
    </div>
  );
};

export default DashboardPage;
