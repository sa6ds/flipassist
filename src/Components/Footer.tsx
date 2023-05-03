import React, { useState } from "react";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

function Footer() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <footer className="z-40 w-full bg-gray-100 py-6">
      <div className="mx-4 p-6 font-light md:mx-16">
        <div className="flex gap-8">
          <div className="">
            {" "}
            <Link href="/links/contact" target="">
              Contact
            </Link>
          </div>
          <div className="">
            {" "}
            <Link href="/links/terms" target="">
              Terms
            </Link>
          </div>
          <div className="">
            {" "}
            <Link href="/links/privacy" target="">
              Privacy
            </Link>
          </div>
          <Link
            className="ml-auto"
            target="_blank"
            href="https://www.instagram.com/sa6ds/"
          >
            <InstagramIcon />
          </Link>
        </div>

        <hr className="mt-6 border border-gray-300"></hr>

        <div className="flex pt-4">
          <div className="">© 2023 flipassist. All rights reserved.</div>
          <div className="ml-auto">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <div className="flex gap-2">
                  <WbSunnyOutlinedIcon />
                  <h1>Light</h1>
                </div>
              ) : (
                <div className="flex gap-2">
                  <DarkModeOutlinedIcon />
                  <h1>Dark</h1>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
