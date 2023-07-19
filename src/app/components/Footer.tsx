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
        <h2 className="">© 2023 Imagen. All rights reserved.</h2>
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

// <footer className="z-40 bg-gray-100 py-4">
//   <div className="mx-auto max-w-[1500px]">
//     <div className="p-6 lg:mx-32">
//       <div className="flex gap-8">
//         <div className="">
//           <Link href="/contact" target="">
//             Contact
//           </Link>
//         </div>
//         <div>
//           <Link href="/privacy" target="">
//             Privacy
//           </Link>
//         </div>
//         {/* INSTAGRAM */}
//         <Link
//           className="ml-auto my-auto bi bi-instagram"
//           target="_blank"
//           href="https://www.instagram.com/flipassist.app/"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="currentColor"
//             viewBox="0 0 16 16"
//           >
//             <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
//           </svg>
//         </Link>

//         {/* TWITTER */}
//         <Link
//           target="_blank"
//           href="https://www.twitter.com/flipassist/"
//           className=" my-auto bi bi-instagram"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="currentColor"
//             className="bi bi-twitter"
//             viewBox="0 0 16 16"
//           >
//             <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
//           </svg>
//         </Link>

//         {/* DISCORD */}
//         <Link
//           className="my-auto bi bi-instagram"
//           target="_blank"
//           href="https://discord.gg/ewTSMprYdg"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="currentColor"
//             className="bi bi-discord"
//             viewBox="0 0 16 16"
//           >
//             <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
//           </svg>
//         </Link>
//       </div>

//       <hr className="mt-6 border border-gray-300"></hr>

//       <div className="flex pt-4">
//         <div className="">© 2023 flipassist. All rights reserved.</div>
//         <div className="ml-auto">
//           <button
//             onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//           >
//             {theme === "light" ? (
//               <div className="flex gap-2">
//                 <svg
//                   className="w-5 my-auto h-5 stroke-slate-700"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                   ></path>
//                 </svg>
//                 <h1>Light</h1>
//               </div>
//             ) : (
//               <div className="flex gap-2">
//                 <svg
//                   className="w-5 h-5 my-auto stroke-slate-700"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//                   ></path>
//                 </svg>
//                 <h1>Dark</h1>
//               </div>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </footer>
