import Link from "next/link";
import React, { useState } from "react";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { SidebarData } from "./SidebarData";
import { useRouter, usePathname } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Hamburger from "hamburger-react";
import { Tooltip } from "@mui/material";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  //   const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false); // Add this state variable

  return (
    <div className="text-sm">
      <button
        className="absolute right-10 top-8 z-50 block md:hidden"
        onClick={() => setIsOpen(!isOpen)} // Toggle the value of isOpen
      >
        <Hamburger size={25} />
      </button>

      {/* SIDEBAR  */}
      <div
        className={`fixed z-50 h-screen w-auto bg-white shadow-xl md:block ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div className="relative">
          <div className="fixed z-50 h-screen w-auto min-w-[250px] bg-white shadow-xl">
            <h1 className="mt-7 text-center">
              <Link href="/" className="text-3xl text-slate-900 font-bold">
                flipassist
              </Link>
            </h1>
            <div className="text-[#757575]">
              <p className="ml-8 mt-10">MENU</p>

              <ul className="inline justify-center px-8">
                {SidebarData.map((val, key) => {
                  const isActive = pathname === val.path;

                  return (
                    <div
                      key={key}
                      className={`flex h-12 cursor-pointer items-center hover:bg-slate-800 hover:text-white ${
                        isActive ? "active" : ""
                      }`}
                      onClick={() => {
                        router.push(val.path);
                      }}
                    >
                      <i className="ml-5">{val.icon}</i>
                      <p className="ml-3">{val.title}</p>
                    </div>
                  );
                })}
              </ul>

              {/* SIDE BAR FOOTER */}

              <div className="absolute bottom-0 flex h-16 w-full items-center bg-gray-300 text-sm">
                <div className="ml-6 justify-center">
                  <Image
                    src=""
                    //   src={sessionData?.user.image ?? ""}
                    className="w-8 rounded-full"
                    width={40}
                    height={40}
                    alt="profile"
                  ></Image>
                </div>
                <div className="ml-5">
                  <div className="max-w-[160px] truncate">
                    {/* <h1>{sessionData?.user.name}</h1> */}
                  </div>
                  <div className="text-[#757575]">Account</div>
                </div>

                <Tooltip title="Sign Out">
                  <button
                    className=" my-auto ml-auto mr-8"
                    //   onClick={() => {
                    //     signOut({ callbackUrl: "/" }).catch((e) => {
                    //       console.error(e);
                    //     });
                    //   }}
                  >
                    <ExitToAppOutlinedIcon sx={{ fontSize: 20 }} />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
