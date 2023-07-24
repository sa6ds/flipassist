import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Hamburger from "hamburger-react";
import { Tooltip } from "@mui/material";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../Firebase";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
        localStorage.removeItem("user");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="text-sm">
      <button
        className="bg-slate-50 absolute right-10 top-8 z-50 block md:hidden"
        onClick={() => setIsOpen(!isOpen)} 
      >
        <Hamburger size={25} />
      </button>

      {/* SIDEBAR  */}
      <div
        className={`fixed z-50 bg-slate-50 h-screen w-auto shadow-xl md:block ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div className="relative">
          <div className="fixed z-50 h-screen bg-slate-50 w-auto min-w-[250px] shadow-xl">
            <div className="flex flex-row items-center justify-center mt-8">
              <Link href="/" className="bg-purple-500 p-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="white"
                  className="bi bi-box-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
                  />
                </svg>
              </Link>
              <h1 className="text-slate-900 px-4 font-bold tracking-tighter text-2xl my-auto">
                flipassist
              </h1>
            </div>
            <div className="text-[#757575]">
              <p className="ml-10 mt-10">MENU</p>

              <ul className="mt-3">
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
                      <i className="ml-8">{val.icon}</i>
                      <p>{val.title}</p>
                    </div>
                  );
                })}
              </ul>

              {/* SIDE BAR FOOTER */}
              {user ? (
                <div>
                  <div className="absolute bottom-0 flex h-16 w-full items-center text-sm">
                    <div className="ml-6 justify-center">
                      <Image
                        src={user?.photoURL ?? ""}
                        className="w-8 rounded-full"
                        width={40}
                        height={40}
                        alt="profile"
                      ></Image>
                    </div>
                    <div className="ml-5">
                      <div className="max-w-[160px] truncate">
                        <h2 className="text-[#757575]">Signed in as</h2>
                        <h1 className="font-bold">{user?.displayName}</h1>
                      </div>
                    </div>

                    <Tooltip title="Sign Out">
                      <button
                        className="my-auto ml-auto mr-8"
                        onClick={handleLogout}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-box-arrow-in-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="absolute bottom-0 flex h-16 w-full items-center text-sm">
                    <div className="rounded-lg px-6 py-1.5 mx-auto justify-center">
                      <Link className="" href="/">
                        You are logged out
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
