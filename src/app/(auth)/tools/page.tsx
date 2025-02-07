"use client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import { useState } from "react";
import React from "react";
import { toast } from "react-hot-toast";

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-down"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-up"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-map-pin"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-mail"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-clock"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const StepsIcon = () => (
  <svg
    width="20"
    height="22"
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 16H18M1.99997 12H5.99997M1.99997 15V12.62C1.99997 10.5 0.969971 9.5 0.999971 7C1.02997 4.28 2.48997 1 5.49997 1C7.36997 1 7.99997 2.8 7.99997 4.5C7.99997 7.61 5.99997 10.16 5.99997 13.18V15C5.99997 15.5304 5.78926 16.0391 5.41419 16.4142C5.03911 16.7893 4.5304 17 3.99997 17C3.46954 17 2.96083 16.7893 2.58576 16.4142C2.21069 16.0391 1.99997 15.5304 1.99997 15ZM18 19V16.62C18 14.5 19.03 13.5 19 11C18.97 8.28 17.51 5 14.5 5C12.63 5 12 6.8 12 8.5C12 11.61 14 14.16 14 17.18V19C14 19.5304 14.2107 20.0391 14.5858 20.4142C14.9608 20.7893 15.4695 21 16 21C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-link"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-user"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CreditCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-credit-card"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

type SizeCategory = "mens" | "womens";
type SizeType = "US" | "UK" | "EU" | "CM";

interface SizeConversion {
  US: string;
  UK: string;
  EU: string;
  CM: string;
}

const sizeConversions: Record<SizeCategory, SizeConversion[]> = {
  mens: [
    { US: "3.5", UK: "3", EU: "35.5", CM: "21.6" },
    { US: "4", UK: "3.5", EU: "36", CM: "22" },
    { US: "4.5", UK: "4", EU: "36.5", CM: "22.4" },
    { US: "5", UK: "4.5", EU: "37.5", CM: "22.9" },
    { US: "5.5", UK: "5", EU: "38", CM: "23.3" },
    { US: "6", UK: "5.5", EU: "38.5", CM: "23.7" },
    { US: "6.5", UK: "6", EU: "39", CM: "24.1" },
    { US: "7", UK: "6", EU: "40", CM: "24.5" },
    { US: "7.5", UK: "6.5", EU: "40.5", CM: "25" },
    { US: "8", UK: "7", EU: "41", CM: "25.4" },
    { US: "8.5", UK: "7.5", EU: "42", CM: "25.8" },
    { US: "9", UK: "8", EU: "42.5", CM: "26.2" },
    { US: "9.5", UK: "8.5", EU: "43", CM: "26.7" },
    { US: "10", UK: "9", EU: "44", CM: "27.1" },
    { US: "10.5", UK: "9.5", EU: "44.5", CM: "27.5" },
    { US: "11", UK: "10", EU: "45", CM: "27.9" },
    { US: "11.5", UK: "10.5", EU: "45.5", CM: "28.3" },
    { US: "12", UK: "11", EU: "46", CM: "28.8" },
    { US: "12.5", UK: "11.5", EU: "47", CM: "29.2" },
    { US: "13", UK: "12", EU: "47.5", CM: "29.6" },
    { US: "13.5", UK: "12.5", EU: "48", CM: "30" },
    { US: "14", UK: "13", EU: "48.5", CM: "30.5" },
    { US: "15", UK: "14", EU: "49.5", CM: "31.3" },
    { US: "16", UK: "15", EU: "50.5", CM: "32.3" },
    { US: "17", UK: "16", EU: "51.5", CM: "33" },
    { US: "18", UK: "17", EU: "52.5", CM: "33.9" },
  ],
  womens: [], // Now TypeScript knows this is SizeConversion[]
};

// Now this will work without type errors
sizeConversions.mens.forEach((size) => {
  sizeConversions.womens.push({
    US: (Number(size.US) + 1.5).toString(),
    UK: size.UK,
    EU: size.EU,
    CM: size.CM,
  });
});

export default function ToolsPage() {
  const [address, setAddress] = useState("");
  const [jiggedAddresses, setJiggedAddresses] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [dotTrickEmails, setDotTrickEmails] = useState<string[]>([]);
  const [totalProxies, setTotalProxies] = useState("");
  const [totalTasks, setTotalTasks] = useState("");
  const [baseDelay, setBaseDelay] = useState("");
  const [proxyDelay, setProxyDelay] = useState<number | null>(null);
  const [shoeSize, setShoeSize] = useState("");
  const [sizeCategory, setSizeCategory] = useState<SizeCategory>("mens");
  const [sizeType, setSizeType] = useState("US");
  const [convertedSizes, setConvertedSizes] = useState<SizeConversion | null>(
    null
  );
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy All");
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [profileCount, setProfileCount] = useState<string>("1");
  const [profiles, setProfiles] = useState<string[]>([]);
  const [cardType, setCardType] = useState<string>("visa");
  const [generatedCards, setGeneratedCards] = useState<string[]>([]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyButtonText("Copied!");
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopyButtonText("Copy All"), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const generateJiggedAddresses = () => {
    if (!address.trim()) {
      toast.error("Please enter an address");
      return;
    }

    const prefixes = [
      "GAPQ",
      "NVZW",
      "IVUZ",
      "RGEA",
      "FUBW",
      "COUJ",
      "ROSI",
      "XPKF",
      "PPKQ",
      "MBYM",
    ];
    const suffixes = ["Room", "Apartment", "Unit", "Suite", "Apt", "Flat"];
    const floors = [
      "1st Floor",
      "2nd Floor",
      "3rd Floor",
      "Ground Floor",
      "Upper Level",
      "Lower Level",
    ];

    const jiggedAddrs = [
      ...prefixes.map((prefix) => `${prefix} ${address}`),
      ...suffixes.map(
        (suffix) =>
          `${address} ${suffix} ${Math.floor(Math.random() * 100) + 1}`
      ),
      ...floors.map((floor) => `${address} ${floor}`),
    ];

    setJiggedAddresses(jiggedAddrs);
  };

  const generateDotTrickEmails = () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    const [username, domain] = email.split("@");
    if (!username || !domain) return;

    const dotTrickEmails: string[] = [];

    // Original dot trick
    for (let i = 1; i < username.length; i++) {
      let modified = username.slice(0, i) + "." + username.slice(i);
      if (!dotTrickEmails.includes(`${modified}@${domain}`)) {
        dotTrickEmails.push(`${modified}@${domain}`);
      }
    }

    // Plus trick (Gmail specific)
    dotTrickEmails.push(`${username}+1@${domain}`);
    dotTrickEmails.push(`${username}+shop@${domain}`);
    dotTrickEmails.push(`${username}+order@${domain}`);

    setDotTrickEmails(dotTrickEmails);
  };

  const calculateProxyDelay = () => {
    const proxies = Number.parseInt(totalProxies);
    const tasks = Number.parseInt(totalTasks);
    const delay = Number.parseInt(baseDelay);

    if (!proxies || !tasks || !delay) {
      toast.error("Please fill in all fields with valid numbers");
      return;
    }

    if (tasks > proxies) {
      toast("More tasks than proxies may cause issues", {
        icon: "⚠️",
        style: {
          background: "#FEF3C7",
          color: "#92400E",
        },
      });
    }

    setProxyDelay((proxies / tasks) * delay);
  };

  const convertShoeSize = () => {
    if (!shoeSize.trim()) {
      toast.error("Please enter a shoe size first");
      return;
    }

    const sizes = sizeConversions[sizeCategory];
    let found: SizeConversion | null = null;

    // Find the matching size in the conversion table
    for (const size of sizes) {
      if (size[sizeType as SizeType] === shoeSize) {
        found = size;
        break;
      }
    }

    if (!found) {
      toast.error("Size not found in conversion table");
      return;
    }

    setConvertedSizes(found);
    toast.success(`Converted ${shoeSize} ${sizeType} size successfully`);
  };

  const toggleExpand = (tool: string) => {
    setExpandedTool(expandedTool === tool ? null : tool);
  };

  const generateProfiles = () => {
    const count = parseInt(profileCount);
    if (isNaN(count) || count < 1) {
      toast.error("Please enter a valid number");
      return;
    }

    const firstNames = [
      "John",
      "Jane",
      "Mike",
      "Sarah",
      "David",
      "Emma",
      "James",
      "Emily",
      "Michael",
      "Olivia",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
    ];
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const phonePrefix = ["917", "646", "212"];
    const streets = [
      "Main St",
      "Broadway",
      "Park Ave",
      "5th Ave",
      "Madison Ave",
    ];
    const cities = ["New York", "Brooklyn", "Queens", "Bronx", "Staten Island"];
    const states = ["NY", "NJ", "CT", "PA", "MA"];
    const zips = ["10001", "10002", "10003", "10004", "10005"];

    const generated: string[] = [];
    for (let i = 0; i < count; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const prefix =
        phonePrefix[Math.floor(Math.random() * phonePrefix.length)];
      const street = streets[Math.floor(Math.random() * streets.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const state = states[Math.floor(Math.random() * states.length)];
      const zip = zips[Math.floor(Math.random() * zips.length)];

      generated.push(
        JSON.stringify(
          {
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(
              Math.random() * 999
            )}@${domain}`,
            phone: `${prefix}${Math.floor(Math.random() * 9000000) + 1000000}`,
            address: `${Math.floor(Math.random() * 999) + 1} ${street}`,
            city,
            state,
            zip,
          },
          null,
          2
        )
      );
    }

    setProfiles(generated);
    toast.success(`Generated ${count} profiles`);
  };

  const generateCards = () => {
    const cards: string[] = [];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < 5; i++) {
      let prefix = "4"; // Visa
      let length = 16;

      if (cardType === "mastercard") {
        prefix = "51";
        length = 16;
      } else if (cardType === "amex") {
        prefix = "34";
        length = 15;
      }

      let number = prefix;
      for (let j = number.length; j < length; j++) {
        number += Math.floor(Math.random() * 10);
      }

      // Luhn algorithm check digit
      let sum = 0;
      let isEven = false;
      for (let j = number.length - 1; j >= 0; j--) {
        let digit = parseInt(number[j]);
        if (isEven) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
      }
      if (sum % 10 !== 0) {
        number = number.slice(0, -1) + ((10 - (sum % 10)) % 10).toString();
      }

      const month = (Math.floor(Math.random() * 12) + 1)
        .toString()
        .padStart(2, "0");
      const year = (currentYear + Math.floor(Math.random() * 5))
        .toString()
        .slice(-2);
      const cvv = Math.floor(Math.random() * 900 + 100).toString();

      cards.push(`${number}|${month}|${year}|${cvv}`);
    }

    setGeneratedCards(cards);
    toast.success("Generated test cards");
  };

  const shortenUrl = async () => {
    if (!longUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      const response = await fetch("https://api.tinyurl.com/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TINY_URL_API_KEY}`,
        },
        body: JSON.stringify({
          url: longUrl,
          domain: "tinyurl.com",
        }),
      });

      const data = await response.json();
      if (data.data && data.data.tiny_url) {
        setShortUrl(data.data.tiny_url);
        toast.success("URL shortened successfully");
      } else {
        throw new Error("Failed to shorten URL");
      }
    } catch (error) {
      toast.error("Failed to shorten URL");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Tools" />

        <div className="mx-8 my-8">
          <div className="space-y-4">
            <ToolCard
              title="Alternative Address Jigger"
              description="Generate variations of an address for multiple orders"
              icon={
                <div className="text-purple-500">
                  <MapPinIcon />
                </div>
              }
              expanded={expandedTool === "address-jigger"}
              onToggle={() => toggleExpand("address-jigger")}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Original Address
                  </label>
                  <input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={generateJiggedAddresses}
                  className="min-w-[144px] text-sm bg-green-500 hover:bg-green-600 text-white whitespace-normal h-auto min-h-[40px] transition-all duration-200 p-2 rounded-md"
                >
                  Generate Jigged Addresses
                </button>
                {jiggedAddresses.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Jigged Addresses:</h4>
                      <div className="space-x-2">
                        <button
                          onClick={() =>
                            copyToClipboard(jiggedAddresses.join("\n"))
                          }
                          className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                          {copyButtonText}
                        </button>
                        <button
                          onClick={() => setJiggedAddresses([])}
                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="h-[200px] w-full rounded-md border p-4 overflow-y-auto">
                      <div className="space-y-2">
                        {jiggedAddresses.map((addr, index) => (
                          <div key={index} className="flex items-center">
                            <p className="text-sm">{addr}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ToolCard>

            <ToolCard
              title="Gmail Dot Trick"
              description="Generate Gmail variations using the dot trick"
              icon={
                <div className="text-purple-500">
                  <MailIcon />
                </div>
              }
              expanded={expandedTool === "gmail-dot-trick"}
              onToggle={() => toggleExpand("gmail-dot-trick")}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gmail Address
                  </label>
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Gmail address"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={generateDotTrickEmails}
                  className="min-w-[144px] text-sm bg-green-500 hover:bg-green-600 text-white whitespace-normal h-auto min-h-[40px] transition-all duration-200 p-2 rounded-md"
                >
                  Generate Dot Trick Emails
                </button>
                {dotTrickEmails.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Dot Trick Variations:</h4>
                      <div className="space-x-2">
                        <button
                          onClick={() =>
                            copyToClipboard(dotTrickEmails.join("\n"))
                          }
                          className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                          {copyButtonText}
                        </button>
                        <button
                          onClick={() => setDotTrickEmails([])}
                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="h-[200px] w-full rounded-md border p-4 overflow-y-auto">
                      <div className="space-y-2">
                        {dotTrickEmails.map((email, index) => (
                          <p key={index} className="text-sm">
                            {email}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ToolCard>

            <ToolCard
              title="Proxy Delay Calculator"
              description="Calculate optimal delay between bot requests"
              icon={
                <div className="text-purple-500">
                  <ClockIcon />
                </div>
              }
              expanded={expandedTool === "proxy-delay"}
              onToggle={() => toggleExpand("proxy-delay")}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="totalProxies"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Proxies
                  </label>
                  <input
                    id="totalProxies"
                    type="number"
                    value={totalProxies}
                    onChange={(e) => setTotalProxies(e.target.value)}
                    placeholder="Enter total proxies"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="totalTasks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Tasks
                  </label>
                  <input
                    id="totalTasks"
                    type="number"
                    value={totalTasks}
                    onChange={(e) => setTotalTasks(e.target.value)}
                    placeholder="Enter total tasks"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="baseDelay"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Base Delay (ms)
                  </label>
                  <input
                    id="baseDelay"
                    type="number"
                    value={baseDelay}
                    onChange={(e) => setBaseDelay(e.target.value)}
                    placeholder="Enter base delay in milliseconds"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={calculateProxyDelay}
                  className="min-w-[144px] text-sm bg-green-500 hover:bg-green-600 text-white whitespace-normal h-auto min-h-[40px] transition-all duration-200 p-2 rounded-md"
                >
                  Calculate Delay
                </button>
                {proxyDelay !== null && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h4 className="font-semibold">Calculated Delay:</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {proxyDelay.toFixed(2)} ms
                    </p>
                  </div>
                )}
              </div>
            </ToolCard>

            <ToolCard
              title="Shoe Size Converter"
              description="Convert shoe sizes between US, UK, EU, and CM"
              icon={
                <div className="text-purple-500">
                  <StepsIcon />
                </div>
              }
              expanded={expandedTool === "shoe-size"}
              onToggle={() => toggleExpand("shoe-size")}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="shoeSize"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shoe Size
                  </label>
                  <input
                    id="shoeSize"
                    type="number"
                    value={shoeSize}
                    onChange={(e) => setShoeSize(e.target.value)}
                    placeholder="Enter shoe size"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="sizeCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="sizeCategory"
                    value={sizeCategory}
                    onChange={(e) =>
                      setSizeCategory(e.target.value as SizeCategory)
                    }
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="mens">Men's</option>
                    <option value="womens">Women's</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="sizeType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Size Type
                  </label>
                  <select
                    id="sizeType"
                    value={sizeType}
                    onChange={(e) => setSizeType(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="EU">EU</option>
                    <option value="CM">CM</option>
                  </select>
                </div>
                <button
                  onClick={convertShoeSize}
                  className="min-w-[144px] text-sm bg-green-500 hover:bg-green-600 text-white whitespace-normal h-auto min-h-[40px] transition-all duration-200 p-2 rounded-md"
                >
                  Convert Size
                </button>
                {convertedSizes && (
                  <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-gray-100 rounded-md">
                      <h4 className="font-semibold">US</h4>
                      <p className="text-2xl font-bold">{convertedSizes.US}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-md">
                      <h4 className="font-semibold">UK</h4>
                      <p className="text-2xl font-bold">{convertedSizes.UK}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-md">
                      <h4 className="font-semibold">EU</h4>
                      <p className="text-2xl font-bold">{convertedSizes.EU}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-md">
                      <h4 className="font-semibold">CM</h4>
                      <p className="text-2xl font-bold">{convertedSizes.CM}</p>
                    </div>
                  </div>
                )}
              </div>
            </ToolCard>

            <ToolCard
              title="Profile Generator"
              description="Generate random profiles for testing"
              icon={
                <div className="text-purple-500">
                  <UserIcon />
                </div>
              }
              expanded={expandedTool === "profile-generator"}
              onToggle={() => toggleExpand("profile-generator")}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="profileCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Profiles
                  </label>
                  <input
                    id="profileCount"
                    type="number"
                    value={profileCount}
                    onChange={(e) => setProfileCount(e.target.value)}
                    placeholder="Enter number of profiles"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={generateProfiles}
                  className="min-w-[144px] text-sm bg-green-500 hover:bg-green-600 text-white whitespace-normal h-auto min-h-[40px] transition-all duration-200 p-2 rounded-md"
                >
                  Generate Profiles
                </button>
                {profiles.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Generated Profiles:</h4>
                      <div className="space-x-2">
                        <button
                          onClick={() => copyToClipboard(profiles.join("\n"))}
                          className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                          {copyButtonText}
                        </button>
                        <button
                          onClick={() => setProfiles([])}
                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="h-[200px] w-full rounded-md border p-4 overflow-y-auto">
                      <div className="space-y-2">
                        {profiles.map((profile, index) => (
                          <pre
                            key={index}
                            className="text-sm whitespace-pre-wrap"
                          >
                            {profile}
                          </pre>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ToolCard>

            <ToolCard
              title="Credit Card Generator"
              description="Generate test credit card numbers"
              icon={
                <div className="text-purple-500">
                  <CreditCardIcon />
                </div>
              }
              expanded={expandedTool === "card-generator"}
              onToggle={() => toggleExpand("card-generator")}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="cardType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Type
                  </label>
                  <select
                    id="cardType"
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">American Express</option>
                  </select>
                </div>
                <button
                  onClick={generateCards}
                  className="min-w-[144px] text-sm bg-green-500 hover:bg-green-600 text-white whitespace-normal h-auto min-h-[40px] transition-all duration-200 p-2 rounded-md"
                >
                  Generate Test Cards
                </button>
                {generatedCards.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Generated Cards:</h4>
                      <div className="space-x-2">
                        <button
                          onClick={() =>
                            copyToClipboard(generatedCards.join("\n"))
                          }
                          className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                          {copyButtonText}
                        </button>
                        <button
                          onClick={() => setGeneratedCards([])}
                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="h-[200px] w-full rounded-md border p-4 overflow-y-auto">
                      <div className="space-y-2">
                        {generatedCards.map((card, index) => (
                          <p key={index} className="text-sm font-mono">
                            {card}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ToolCard>

            <ToolCard
              title="Link Shortener"
              description="Shorten long URLs"
              icon={
                <div className="text-purple-500">
                  <LinkIcon />
                </div>
              }
              expanded={expandedTool === "link-shortener"}
              onToggle={() => toggleExpand("link-shortener")}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="longUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Long URL
                  </label>
                  <input
                    id="longUrl"
                    type="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter URL to shorten"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={shortenUrl}
                  className="min-w-[144px] text-sm bg-green-500 hover:bg-green-600 text-white whitespace-normal h-auto min-h-[40px] transition-all duration-200 p-2 rounded-md"
                >
                  Shorten URL
                </button>
                {shortUrl && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium break-all">
                        {shortUrl}
                      </p>
                      <button
                        onClick={() => copyToClipboard(shortUrl)}
                        className="ml-2 px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ToolCard>
          </div>
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
    </div>
  );
}

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function ToolCard({
  title,
  description,
  icon,
  expanded,
  onToggle,
  children,
}: ToolCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <button
        className="w-full text-left cursor-pointer flex items-center justify-between p-4"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="mr-4 p-2 rounded-full bg-purple-50">
            <div className="text-purple-500">{icon}</div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-wrap text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex-shrink-0 text-gray-400">
          {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </button>
      {expanded && (
        <div className="border-t border-gray-100">
          <div className="p-4">{children}</div>
        </div>
      )}
    </div>
  );
}
