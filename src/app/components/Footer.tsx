"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function Footer() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (theme) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-full text-slate-500 text-sm  mx-12 lg:mx-32 font-light">
      <footer className="z-40 py-6 mx-auto lg:flex max-w-[1400px]">
        <h2>© 2025 flipassist. All rights reserved.</h2>
        <div className="ml-auto flex mt-3 lg:mt-0 gap-5">
          <Link
            target=""
            href="/contact"
            className="hover:underline hover:text-purple-500"
          >
            Contact
          </Link>
          <Link
            target=""
            href="/privacy"
            className="hover:underline hover:text-purple-500"
          >
            Privacy
          </Link>
          <Link
            href="https://discord.gg/ewTSMprYdg"
            target=""
            className="hover:underline hover:text-purple-500"
          >
            Discord
          </Link>
          <Link
            href="https://twitter.com/flipassist/"
            target="_blank"
            className="hover:underline hover:text-purple-500"
          >
            Twitter
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
