import Link from "next/link";
import React from "react";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { SidebarData } from "./SidebarData";
import { useRouter } from "next/router";

function Sidebar({ name }: { name: string }) {
  const router = useRouter();
  return (
    <div className="relative h-screen w-72 shadow-xl">
      <h1 className="logo pl-10 pt-7">flipassist</h1>
      <div className="text-muted">
        <p className="text-md pb-5 pl-8 pt-10">MENU</p>
        <ul>
          {SidebarData.map((val, key) => {
            const isActive = router.pathname === val.link;

            return (
              <li
                key={key}
                className={`flex h-12 cursor-pointer items-center hover:bg-slate-800 hover:text-white ${
                  isActive ? "active" : ""
                }`}
                onClick={() => {
                  router.push(val.link);
                }}
              >
                <i className="pl-5">{val.icon}</i>
                <p className="pl-3">{val.title}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* SIDE BAR FOOTER */}
      <div className="absolute bottom-0 flex h-20 w-full items-center bg-gray-200 ">
        <div className="ml-7 justify-center">
          <PersonOutlineOutlinedIcon className="text-[30px]" />
        </div>
        <div className="ml-5">
          <div className="max-w-[160px] truncate">
            <h1>{name}</h1>
          </div>
          <div className="text-muted">Account</div>
        </div>
        <Link href="/" className="my-auto ml-auto pr-8">
          <ExitToAppOutlinedIcon className="h-[25px]" />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
