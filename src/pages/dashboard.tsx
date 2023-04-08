import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightFromBracket,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
useContext;

const DashboardPage: NextPage = () => {
  const handleSignIn = () => {
    signIn(); // Use NextAuth's signIn() function to initiate the authentication flow
  };

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
