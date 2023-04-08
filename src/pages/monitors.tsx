import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Sidebar from "./Components/Sidebar";
import { useContext, useEffect, useState } from "react";

const Monitors: NextPage = () => {
  const [users, setUsers] = useState({ name: "" });

  useEffect(() => {
    setUsers({
      name: "saad",
    });
  }, []);

  return (
    <div className="flex truncate font-poppins font-[500]">
      <Sidebar name={users.name} />
      <div>Monitors</div>
    </div>
  );
};

export default Monitors;
