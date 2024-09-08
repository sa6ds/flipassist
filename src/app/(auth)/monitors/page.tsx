"use client";
import Sidebar from "@/app/components/Sidebar";
import { useState, useCallback } from "react";
import Header from "@/app/components/Header";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "@/app/components/Footer";

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

interface MonitorItemProps {
  monitor: Monitor;
  index: number;
  removeMonitor: (index: number) => void;
}

const MonitorItem = ({ monitor, index, removeMonitor }: MonitorItemProps) => (
  <div className="mb-8 w-full justify-center px-4 md:w-[450px]">
    <div className="mb-2 flex items-center justify-between">
      <h2 className="mb-2 text-slate-900 text-center text-xl font-bold md:text-2xl">
        {monitor.name}
      </h2>
      <button
        className="rounded-full p-2 hover:bg-gray-100"
        onClick={() => removeMonitor(index)}
      >
        <CloseIcon />
      </button>
    </div>
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName={monitor.twitter}
      options={{ height: 600 }}
      tweetLimit={5}
    />
  </div>
);

export default function Monitors() {
  const [userEntry, setUserEntry] = useState("");
  const [monitors, setMonitors] = useState<Monitor[]>(defaultMonitors);

  const addMonitor = useCallback((userEntry: string) => {
    setMonitors((prevMonitors) => [
      { name: userEntry, twitter: userEntry },
      ...prevMonitors,
    ]);
  }, []);

  const removeMonitor = useCallback((index: number) => {
    setMonitors((prevMonitors) => prevMonitors.filter((_, i) => i !== index));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEntry(event.target.value);
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
      setUserEntry("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleAddMonitor();
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Monitors" />
        <div className="my-2 mb-10 flex justify-center gap-3">
          <input
            className="mt-8 w-7/12 rounded-lg border border-gray-200 px-5 py-1.5 md:w-64"
            placeholder="Username"
            value={userEntry}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
          />
          <button
            className="duration-1500 duration-1500 bg-green-500 hover:bg-green-600 border border-green-600 py-1.5 text-center text-white transition-all mt-8 w-20 rounded-lg"
            onClick={handleAddMonitor}
          >
            add
          </button>
        </div>
        <div className="justify-center px-4 sm:flex sm:flex-wrap sm:gap-1">
          {monitors.map((monitor, index) => (
            <MonitorItem
              key={monitor.name}
              monitor={monitor}
              index={index}
              removeMonitor={removeMonitor}
            />
          ))}
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
    </div>
  );
}
