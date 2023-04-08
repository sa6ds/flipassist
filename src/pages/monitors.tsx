import { NextPage } from "next";
import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";

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
