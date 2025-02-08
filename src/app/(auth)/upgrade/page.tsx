"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { auth, db } from "@/app/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import CheckIcon from "@/app/assets/icons/upgrade/CheckIcon";
import XIcon from "@/app/assets/icons/upgrade/XIcon";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "For casual resellers",
    features: [
      "Intuitive dashboard",
      "Profit tracking",
      "Basic metrics",
      "Profit calculator",
      "Reselling tools",
      "Up to 15 inventory items",
    ],
    limitations: [
      "No inventory export/import",
      "No access to monitors",
      "No live prices from StockX/Goat",
    ],
  },
  {
    name: "Pro",
    price: "$19.99/month",
    description: "For serious resellers",
    features: [
      "Everything in Free, plus:",
      "Unlimited inventory items",
      "Inventory export/import",
      "Access to monitors page",
      "Live prices from StockX and Goat",
    ],
  },
];

export default function UpgradePage() {
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          const userData = userDoc.data();
          setIsPro(userData?.isPro || false);
        } catch (error) {
          console.error("Error fetching subscription status:", error);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-grid-gray-200">
      <div className="bg-gradient-to-b from-transparent to-slate-50 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center mb-8 mt-8">
            <h1 className="text-slate-900 tracking-tighter text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Upgrade Your Reselling Experience
            </h1>
            <p className="text-lg text-gray-600">
              Take your flipping game to the next level with flipassist Pro
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mb-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  tier.name === "Pro"
                    ? "border-2 border-purple-500"
                    : "border border-gray-200"
                }`}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    {tier.price}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {tier.limitations?.map((limitation) => (
                      <li
                        key={limitation}
                        className="flex items-center text-gray-500"
                      >
                        <XIcon />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 ${
                      tier.name === "Pro"
                        ? "bg-purple-500 hover:bg-purple-600 text-white"
                        : "bg-gray-500 hover:bg-gray-600 text-white"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Loading..."
                      : tier.name === "Pro"
                      ? isPro
                        ? "Current Plan"
                        : "Upgrade Now"
                      : isPro
                      ? "Free Tier"
                      : "Current Plan"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isPro && (
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500">
                Want to cancel your subscription? Visit your{" "}
                <a
                  href="/settings"
                  className="text-purple-500 hover:text-purple-600 underline"
                >
                  settings page
                </a>
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
