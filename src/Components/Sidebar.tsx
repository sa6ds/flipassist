import Link from "next/link";
import React from "react";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { SidebarData } from "./SidebarData";
import { useRouter } from "next/router";

function Sidebar({ name }: { name: string }) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 h-fit w-screen bg-white md:fixed md:h-screen md:w-auto md:min-w-[288px] md:shadow-xl">
      <h1 className="logo hidden md:block md:pl-10 md:pt-7">
        <Link href="/" className="font-bold">
          flipassist
        </Link>
      </h1>
      <div className="text-muted">
        <p className="hidden md:mt-10 md:block md:pl-8 md:text-sm">MENU</p>

        <ul className="flex justify-center px-8 md:inline">
          {SidebarData.map((val, key) => {
            const isActive = router.pathname === "/content/" + val.link;

            return (
              <li
                key={key}
                className={`flex h-14 w-full cursor-pointer items-center justify-center hover:bg-gray-800 hover:text-white md:justify-normal ${
                  isActive
                    ? "border-t-2 border-gray-800 bg-gray-300 md:border-r-2 md:border-t-0"
                    : ""
                }`}
                onClick={() => {
                  router.push(val.link).catch((error) => {
                    console.error(error);
                  });
                }}
              >
                <i className="pl-5">{val.icon}</i>
                <p className="hidden pl-3 md:block">{val.title}</p>
              </li>
            );
          })}
        </ul>

        {/* SIDE BAR FOOTER */}
        {/* <div className="flex h-16 w-full items-center bg-gray-200 text-sm md:absolute md:bottom-0 "> */}
        {/* WORST COME TO WORST: HIDDEN MD:FLEX */}
        <div className="flex h-16 w-full items-center bg-gray-300 text-sm md:absolute md:bottom-0 md:flex ">
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
    </div>
  );
}

export default Sidebar;
