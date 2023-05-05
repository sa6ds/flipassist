import Link from "next/link";
import React, { useState } from "react";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { SidebarData } from "./SidebarData";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Sidebar() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false); // Add this state variable

  return (
    <div>
      <button
        className="absolute right-12 top-8 z-50 block text-2xl text-gray-700 md:hidden"
        onClick={() => setIsOpen(!isOpen)} // Toggle the value of isOpen
      >
        &#9776;
      </button>

      {/* SIDEBAR  */}
      <div
        className={`fixed z-50 h-screen w-auto min-w-[288px] bg-white shadow-xl md:block ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div className="relative">
          <div className="fixed z-50 h-screen w-auto min-w-[288px] bg-white shadow-xl">
            <h1 className="logo mt-7 text-center">
              <Link href="/" className="font-bold">
                flipassist
              </Link>
            </h1>
            <div className="text-muted">
              <p className="mt-10 pl-8 text-sm">MENU</p>

              <ul className="inline justify-center px-8">
                {SidebarData.map((val, key) => {
                  const isActive = router.pathname === "/content/" + val.link;

                  return (
                    <li
                      key={key}
                      className={`flex h-12 cursor-pointer items-center hover:bg-slate-800 hover:text-white ${
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

              {/* SIDE BAR FOOTER */}

              <div className="absolute bottom-0 flex h-16 w-full items-center bg-gray-300 text-sm">
                <div className="ml-7 justify-center">
                  <img
                    src={sessionData?.user.image ?? ""}
                    className="w-8 rounded-full"
                  />
                </div>
                <div className="ml-5">
                  <div className="max-w-[160px] truncate">
                    <h1 className="text-base">{sessionData?.user.name}</h1>
                  </div>
                  <div className="text-muted">Account</div>
                </div>

                <button
                  className=" my-auto ml-auto pr-8"
                  onClick={async () => {
                    await signOut({ callbackUrl: "/" });
                  }}
                >
                  <ExitToAppOutlinedIcon sx={{ fontSize: 20 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
