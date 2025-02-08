"use client";
import Sidebar from "@/app/components/Sidebar";
import { useState, useCallback, useEffect } from "react";
import Header from "@/app/components/Header";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "@/app/components/Footer";
import { auth, db } from "@/app/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import LockIcon from "@/app/assets/icons/monitors/LockIcon";

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
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkProStatus = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setIsPro(userData?.isPro || false);
      } catch (error) {
        console.error("Error fetching pro status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkProStatus();
  }, []);

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
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      <div className="ml-0 md:ml-[250px] flex-1">
        <Header pageTitle="Monitors" />

        {/* Main Content - Blurred for non-pro users */}
        <div
          className={`${
            !isPro ? "opacity-20 pointer-events-none" : ""
          } relative flex-1`}
        >
          <div className="my-2 mb-10 flex justify-center gap-3">
            <input
              className="mt-8 w-7/12 rounded-lg border border-gray-200 px-5 py-1.5 md:w-64"
              placeholder="Username"
              value={userEntry}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
            />
            <button
              className="duration-1500 bg-green-500 hover:bg-green-600 border border-green-600 py-1.5 text-center text-white transition-all mt-8 w-20 rounded-lg"
              onClick={handleAddMonitor}
            >
              Add
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

        {/* Premium Overlay */}
        {!isPro && !isLoading && (
          <div className="fixed inset-0 md:left-[250px] z-40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-[2px] bg-white/50" />
            <div className="relative z-10 flex flex-col items-center justify-center p-6 w-[90%] sm:w-full max-w-xl">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <LockIcon />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 w-full">
                Monitor Updates
              </h2>
              <p className="text-gray-600 text-center mb-8 w-full max-w-sm">
                Stay ahead of the competition with real-time updates from
                popular sneaker accounts. Never miss a drop with our premium
                monitoring features.
              </p>
              <Link href="/upgrade">
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Upgrade to Pro
                </button>
              </Link>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
