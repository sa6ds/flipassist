import Link from "next/link";
import Image from "next/image";
import instagramIcon from "../assets/icons/footer/instagram.svg";
import twitterIcon from "../assets/icons/footer/twitter.svg";
import discordIcon from "../assets/icons/footer/discord.svg";

function Footer() {
  // const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <footer className="z-40 bg-gray-100 py-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="p-6 lg:mx-32">
          <div className="flex gap-8">
            <div className="">
              <Link href="/links/contact" target="">
                Contact
              </Link>
            </div>
            <div>
              <Link href="/links/privacy" target="">
                Privacy
              </Link>
            </div>
            <Link
              className="ml-auto"
              target="_blank"
              href="https://www.instagram.com/flipassist.app/"
            >
              <Image
                className="w-5"
                src={instagramIcon as string}
                alt="Instagram Icon"
              />
            </Link>
            <Link target="_blank" href="https://www.twitter.com/flipassist/">
              <Image
                className="w-5"
                src={twitterIcon as string}
                alt="Twitter Icon"
              />
            </Link>

            <Link target="_blank" href="https://discord.gg/ewTSMprYdg">
              <Image
                className="w-5"
                src={discordIcon as string}
                alt="Discord Icon"
              />
            </Link>
          </div>

          <hr className="mt-6 border border-gray-300"></hr>

          <div className="flex pt-4">
            <div className="">© 2023 flipassist. All rights reserved.</div>
            {/* <div className="ml-auto">
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
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
