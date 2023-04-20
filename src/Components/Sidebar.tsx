import Link from "next/link";
import React from "react";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { SidebarData } from "./SidebarData";
import { useRouter } from "next/router";

function Sidebar({ name }: { name: string }) {
  const router = useRouter();

  return (
    <div className="relative h-screen min-w-[288px] shadow-xl">
      <h1 className="logo pl-10 pt-7">
        <Link href="/" className="font-bold">
          flipassist
        </Link>
      </h1>
      <div className="text-muted">
        <p className="pb-2 pl-8 pt-10 text-sm">MENU</p>
        <ul>
          {SidebarData.map((val, key) => {
            const isActive = router.pathname === "/content/" + val.link;

            return (
              <li
                key={key}
                className={`flex h-12 cursor-pointer items-center hover:bg-gray-800 hover:text-white ${
                  isActive ? "active" : ""
                }`}
                onClick={() => {
                  router.push(val.link).catch((error) => {
                    console.error(error);
                  });
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
      <div className=" absolute bottom-0 flex h-16 w-full items-center bg-gray-200 text-sm ">
        <div className="ml-7 justify-center">
          <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
        </div>
        <div className="ml-5">
          <div className="max-w-[160px] truncate">
            <h1 className="text-base">{name}</h1>
          </div>
          <div className="text-muted">Account</div>
        </div>
        <Link href="/" className="my-auto ml-auto pr-8">
          <ExitToAppOutlinedIcon sx={{ fontSize: 20 }} />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
