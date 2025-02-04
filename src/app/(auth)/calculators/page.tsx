"use client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import WorkInProgress from "@/app/components/WorkInProgress";
import Footer from "@/app/components/Footer";

import { useState } from "react";

interface Platform {
  name: string;
  fee?: number;
  fees?: { [key: string]: number };
  color: string;
  isStockX?: boolean;
  isMercari?: boolean;
  isEbay?: boolean;
  isGoat?: boolean;
  isGrailed?: boolean;
}

const platforms: Platform[] = [
  { name: "GOAT", fee: 0.095, color: "bg-purple-500", isGoat: true },
  {
    name: "StockX",
    fees: {
      "1": 0.09,
      "2": 0.085,
      "3": 0.08,
      "4": 0.075,
      "5": 0.07,
    },
    color: "bg-green-500",
    isStockX: true,
  },
  { name: "eBay", fee: 0.1325, color: "bg-blue-500", isEbay: true },
  { name: "Grailed", fee: 0.09, color: "bg-orange-500", isGrailed: true },
  { name: "Mercari", fee: 0.1, color: "bg-red-500", isMercari: true },
];

const goatLocationFees: { [key: string]: number } = {
  "United States (drop-off)": 0,
  "United States (prepaid shipping)": 5,
  "American Samoa": 35,
  "APO/FPO Pacific": 25,
  "APO/FPO Europe": 25,
  "APO/FPO United States": 25,
  "Mariana Islands": 15,
  "Puerto Rico": 8,
  "U.S. Virgin Islands": 15,
  Australia: 8,
  Austria: 6,
  Belgium: 6,
  Bulgaria: 12,
  "Canada (drop-off)": 0,
  "Canada (prepaid shipping)": 5,
  "Mainland China (drop-off)": 5,
  "Mainland China (prepaid shipping)": 10,
  Croatia: 12,
  Cyprus: 24,
  "Czech Republic": 6,
  Denmark: 10,
  Estonia: 12,
  Finland: 10,
  France: 6,
  "Germany (drop-off)": 2,
  "Germany (prepaid shipping)": 5,
  Greece: 12,
  Guam: 25,
  "Hong Kong (drop-off)": 5,
  "Hong Kong (prepaid shipping)": 10,
  Hungary: 12,
  Indonesia: 10,
  Ireland: 12,
  Italy: 8,
  "Japan (drop-off)": 5,
  "Japan (prepaid shipping)": 10,
  Latvia: 12,
  Lithuania: 12,
  Luxembourg: 10,
  "Malaysia (drop-off)": 8,
  "Malaysia (prepaid shipping)": 10,
  Malta: 24,
  Mexico: 5,
  "Netherlands (drop-off)": 3,
  "Netherlands (prepaid shipping)": 6,
  Philippines: 10,
  Poland: 6,
  Portugal: 12,
  Romania: 12,
  Singapore: 5,
  Slovakia: 6,
  Slovenia: 12,
  "South Korea": 5,
  Spain: 8,
  Sweden: 10,
  Taiwan: 5,
  Thailand: 10,
  "United Kingdom (drop-off)": 2,
  "United Kingdom (prepaid shipping)": 5,
  Other: 30,
};

export default function Calculator() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [stockXLevel, setStockXLevel] = useState("1");
  const [profit, setProfit] = useState<number | null>(null);
  const [platformFee, setPlatformFee] = useState<number | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [location, setLocation] = useState("United States (drop-off)");
  const [sellerRating, setSellerRating] = useState("90");
  const [category, setCategory] = useState("Most categories");
  const [totalReceived, setTotalReceived] = useState<number | null>(null);

  const calculateProfit = () => {
    const purchase = Number.parseFloat(purchasePrice) || 0;
    const sale = Number.parseFloat(salePrice) || 0;
    const shipping = Number.parseFloat(shippingCost) || 0;

    let fee = 0;
    if (selectedPlatform.isStockX && selectedPlatform.fees) {
      fee = (selectedPlatform.fees[stockXLevel] + 0.03) * sale;
    } else if (selectedPlatform.isMercari) {
      fee = 0.1 * (sale + shipping);
    } else if (selectedPlatform.isEbay) {
      switch (category) {
        case "Books & Magazines":
        case "Movies & TV":
        case "Music":
          fee =
            sale <= 7500
              ? 0.1495 * sale
              : 0.1495 * 7500 + 0.0235 * (sale - 7500);
          break;
        case "Coins & Paper Money > Bullion":
          fee = sale <= 7500 ? 0.1325 * sale : 0.07 * sale;
          break;
        case "Clothing, Shoes & Accessories > Women > Women's Bags & Handbags":
          fee = sale <= 2000 ? 0.15 * sale : 0.09 * sale;
          break;
        case "Jewelry & Watches":
          fee = sale <= 5000 ? 0.15 * sale : 0.09 * sale;
          break;
        case "Jewelry & Watches > Watches, Parts & Accessories":
          fee =
            sale <= 1000
              ? 0.15 * sale
              : sale <= 7500
              ? 0.065 * sale
              : 0.03 * sale;
          break;
        case "Art > Art NFTs":
        case "Select Collectibles categories":
          fee = 0.05 * sale;
          break;
        case "Select Business & Industrial categories":
          fee = sale <= 15000 ? 0.03 * sale : 0.005 * sale;
          break;
        case "Musical Instruments & Gear > Guitars & Basses":
          fee = sale <= 7500 ? 0.0635 * sale : 0.0235 * sale;
          break;
        case "Select Clothing, Shoes & Accessories categories":
          fee = sale >= 150 ? 0.08 * sale : 0.1325 * sale;
          break;
        default:
          fee = sale <= 7500 ? 0.1325 * sale : 0.0235 * sale;
      }
    } else if (selectedPlatform.isGoat) {
      const locationFee = goatLocationFees[location] || 0;
      let commissionRate = 0.095;
      if (sellerRating === "below 50") {
        commissionRate = 0.25;
      } else if (sellerRating === "50-69") {
        commissionRate = 0.2;
      } else if (sellerRating === "70-89") {
        commissionRate = 0.15;
      }
      fee = commissionRate * sale + locationFee;
    } else if (selectedPlatform.isGrailed) {
      fee = 0.09 * sale;
    } else {
      fee = sale * (selectedPlatform.fee || 0);
    }

    const totalProfit =
      sale -
      fee -
      purchase -
      (selectedPlatform.isStockX || selectedPlatform.isGoat ? 0 : shipping);
    setProfit(totalProfit);
    setPlatformFee(fee);

    // Calculate the total amount received
    const totalAmountReceived = sale - fee;
    setTotalReceived(totalAmountReceived);
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Calculators" />

        <div className="mx-8 my-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="w-full">
              <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-1.5 bg-gray-100 rounded-lg mb-6">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`p-1 rounded-lg hover:bg-gray-100 transition-all duration-300 ${
                      selectedPlatform.name === platform.name
                        ? "text-gray-900 font-semibold "
                        : "bg-transparent text-gray-600"
                    }`}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedPlatform.color}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-dollar-sign"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    <h2 className="text-gray-900 font-semibold">
                      {selectedPlatform.name}
                    </h2>
                  </h3>
                  <p className="text-sm text-wrap text-gray-500">
                    {selectedPlatform.isStockX
                      ? "StockX fees vary by seller level"
                      : selectedPlatform.isGoat
                      ? "GOAT fees include location-based charges"
                      : selectedPlatform.isEbay
                      ? "eBay fees depend on category"
                      : selectedPlatform.isGrailed
                      ? "Grailed charges a flat fee"
                      : "Platform-specific fees apply"}
                  </p>
                </div>
              </div>

              {selectedPlatform.isEbay && (
                <div className="mb-6">
                  <label className="block text-sm font-semi text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Most categories">Most categories</option>
                    <option value="Books & Magazines">Books & Magazines</option>
                    <option value="Movies & TV">Movies & TV</option>
                    <option value="Music">Music</option>
                    <option value="Coins & Paper Money > Bullion">
                      Coins & Paper Money &gt; Bullion
                    </option>
                    <option value="Clothing, Shoes & Accessories > Women > Women's Bags & Handbags">
                      Women's Bags & Handbags
                    </option>
                    <option value="Jewelry & Watches">Jewelry & Watches</option>
                    <option value="Jewelry & Watches > Watches, Parts & Accessories">
                      Watches, Parts & Accessories
                    </option>
                    <option value="Art > Art NFTs">Art NFTs</option>
                    <option value="Select Collectibles categories">
                      Select Collectibles categories
                    </option>
                    <option value="Select Business & Industrial categories">
                      Select Business & Industrial categories
                    </option>
                    <option value="Musical Instruments & Gear > Guitars & Basses">
                      Guitars & Basses
                    </option>
                    <option value="Select Clothing, Shoes & Accessories categories">
                      Select Clothing, Shoes & Accessories categories
                    </option>
                  </select>
                </div>
              )}

              {selectedPlatform.isGoat && (
                <div className="mb-6">
                  <label className="block text-sm font-semi text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {Object.keys(goatLocationFees).map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedPlatform.isGoat && (
                <div className="mb-6">
                  <label className="block text-sm font-semi text-gray-700 mb-1">
                    Seller Rating
                  </label>
                  <select
                    value={sellerRating}
                    onChange={(e) => setSellerRating(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="90">90 or above (9.5%)</option>
                    <option value="70-89">70-89 (15%)</option>
                    <option value="50-69">50-69 (20%)</option>
                    <option value="below 50">Below 50 (25%)</option>
                  </select>
                </div>
              )}

              {selectedPlatform.isStockX && (
                <div className="mb-6">
                  <label className="block text-sm font-semi text-gray-700 mb-1">
                    Seller Level
                  </label>
                  <select
                    value={stockXLevel}
                    onChange={(e) => setStockXLevel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="1">Level 1 (9%)</option>
                    <option value="2">Level 2 (8.5%)</option>
                    <option value="3">Level 3 (8%)</option>
                    <option value="4">Level 4 (7.5%)</option>
                    <option value="5">Level 5 (7%)</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                {!selectedPlatform.isStockX && !selectedPlatform.isGoat && (
                  <div>
                    <label className="block text-sm font-semi text-gray-700 mb-1">
                      Shipping Cost
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={calculateProfit}
                className="w-36 text-sm bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-md"
              >
                Calculate Profit
              </button>

              {profit !== null && platformFee !== null && (
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semi text-gray-600">
                      Platform Fee:
                    </span>
                    <span className="font-semi">${platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-semi text-gray-600">
                      Total Received:
                    </span>
                    <span className="font-semi">
                      ${totalReceived?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-semi text-gray-600">
                      Total Profit:
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        profit >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      ${profit.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
    </div>
  );
}
