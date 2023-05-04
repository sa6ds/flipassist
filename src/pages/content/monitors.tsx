import { type NextPage } from "next";
import Sidebar from "../../Components/Sidebar";
import { useState } from "react";
import Header from "~/Components/Header";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Footer from "~/Components/Footer";
import CloseIcon from "@mui/icons-material/Close";

interface Monitor {
  name: string;
  twitter: string;
}

const defaultMonitors: Monitor[] = [
  { name: "SNKR_TWITR", twitter: "snkr_twitr" },
  { name: "SOLELINKS", twitter: "SOLELINKS" },
  { name: "Personalz4U", twitter: "personalz4u" },
  { name: "J23app", twitter: "J23app" },
];

const Monitors: NextPage = () => {
  const [userEntry, setuserEntry] = useState("");
  const [monitors, setMonitors] = useState<Monitor[]>(defaultMonitors);

  const addMonitor = (userEntry: string) => {
    setMonitors((prevMonitors) => [
      { name: userEntry, twitter: userEntry },
      ...prevMonitors,
    ]);
  };

  const removeMonitor = (index: number) => {
    setMonitors((prevMonitors) =>
      prevMonitors.filter((monitor, i) => i !== index)
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuserEntry(event.target.value);
  };

  const handleAddMonitor = () => {
    const twitterUsernameRegex = /^[a-zA-Z0-9_]{4,15}$/;
    if (!twitterUsernameRegex.test(userEntry)) {
      alert("Invalid Twitter username");
    } else if (
      monitors.some((m) => m.twitter.toLowerCase() === userEntry.toLowerCase())
    ) {
      alert("Username already exists");
    } else {
      addMonitor(userEntry);
      setuserEntry("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleAddMonitor();
  };

  return (
    <div>
      <div className="flex truncate font-light">
        <Sidebar name="saad" />
        <div className="ml-0 w-full md:ml-[300px]">
          <Header pageTitle="Monitors" />
          <div>
            <div className="my-2 mb-10 flex justify-center gap-3">
              <input
                className="mt-8 w-7/12 rounded-lg border border-gray-300 bg-gray-100 px-5 py-1.5 md:w-64"
                placeholder="Username"
                value={userEntry}
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
              />
              <button
                className="duration-1500 mt-8 w-20 rounded-[10px] border border-black bg-black py-1.5 text-center text-white transition-all hover:bg-white hover:text-black"
                onClick={handleAddMonitor}
              >
                add
              </button>
            </div>
            <div className="justify-center px-4 sm:flex sm:flex-wrap sm:gap-1">
              {monitors.map((val, index) => {
                return (
                  <div
                    className="mb-8 w-full justify-center px-4 md:w-[450px]"
                    key={val.name}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h1 className="mb-2 text-center text-xl font-bold md:text-2xl">
                        {val.name}
                      </h1>
                      <button
                        className="rounded-full p-2 hover:bg-gray-100"
                        onClick={() => removeMonitor(index)}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <TwitterTimelineEmbed
                      sourceType="profile"
                      screenName={val.twitter}
                      options={{ height: 600 }}
                      tweetLimit={5}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitors;
