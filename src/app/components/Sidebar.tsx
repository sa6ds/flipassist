"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../Firebase";
import ArrowIcon from "../assets/icons/sidebar/ArrowIcon";

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
    <div>
      <button
        className="fixed left-2 top-1/2 -translate-y-1/2 z-[60] md:hidden bg-white p-1.5 h-16 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          transform: `translate(${isOpen ? "246px" : "0"}, -50%)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <ArrowIcon isOpen={isOpen} />
      </button>

      {/* SIDEBAR with slide animation */}
      <div
        className={`fixed z-50 bg-white h-screen w-[250px] transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full border-r-[1px] border-gray-200">
          <div className="flex mt-10 gap-3 flex-row ml-9">
            <Link href="/" className="flex gap-3">
              <div className="bg-purple-500 p-3 rounded-[18px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width={15}
                  height={15}
                  className="bi bi-box-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
                  />
                </svg>
              </div>
              <h1 className="text-slate-900 font-bold tracking-tighter text-2xl my-auto">
                flipassist
              </h1>
            </Link>
          </div>

          <ul className="mt-10">
            {SidebarData.map((val, key) => {
              return (
                <div
                  key={key}
                  className={`w-48 my-3 hover:text-purple-500 font-semibold hover:shadow-md shadow-purple-100 hover:shadow-purple-100 hover:bg-white mx-auto py-2 cursor-pointer rounded-lg ${
                    pathname == val.path
                      ? "bg-purple-50 shadow-lg shadow-purple-100 text-purple-600"
                      : ""
                  }`}
                  onClick={() => {
                    router.push(val.path);
                  }}
                >
                  <div className="flex items-center gap-4 ml-4 h-full">
                    <i className="mb-0.5">{val.icon}</i>
                    <p>{val.title}</p>
                    {val.new && (
                      <p className="px-[8px] py-[4px] rounded-3xl border-1 text-[10px] bg-purple-100 text-purple-500 font-light">
                        New!
                      </p>
                    )}
                  </div>
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

      {/* Optional: Add overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default Sidebar;
