"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { auth, db } from "@/app/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import CheckIcon from "@/app/assets/icons/upgrade/CheckIcon";
import XIcon from "@/app/assets/icons/upgrade/XIcon";

import { getStripe } from "@/app/utils/stripe";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { provider } from "@/app/Firebase";
import toast from "react-hot-toast";

type BillingPeriod = "monthly" | "yearly";

const MONTHLY_PRICE = 9.99;
const YEARLY_PRICE = 99.99;
const MONTHLY_TOTAL = MONTHLY_PRICE * 12;
const YEARLY_SAVINGS = Math.round((MONTHLY_TOTAL - YEARLY_PRICE) * 100) / 100;
const YEARLY_MONTHLY_PRICE = (YEARLY_PRICE / 12).toFixed(2);

const STRIPE_PRICE_IDS = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
  yearly: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
};

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
      "Standard support only",
    ],
  },
  {
    name: "Pro",
    price: "$9.99/month",
    description: "For serious resellers",
    features: [
      "Everything in Free, plus:",
      "Unlimited inventory items",
      "Inventory export/import",
      "Access to monitors page",
      "Live prices from StockX and Goat",
      "Priority support & feature requests",
    ],
  },
];

const PricingToggle = ({
  billingPeriod,
  setBillingPeriod,
}: {
  billingPeriod: BillingPeriod;
  setBillingPeriod: (period: BillingPeriod) => void;
}) => {
  return (
    <div className="flex items-center justify-start space-x-3 mb-8">
      <span
        className={`text-sm font-medium ${
          billingPeriod === "monthly" ? "text-gray-900" : "text-gray-500"
        }`}
      >
        Monthly
      </span>
      <button
        onClick={() =>
          setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")
        }
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
          billingPeriod === "yearly" ? "bg-purple-500" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            billingPeriod === "yearly" ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium ${
          billingPeriod === "yearly" ? "text-gray-900" : "text-gray-500"
        }`}
      >
        Yearly
      </span>
    </div>
  );
};

export default function UpgradePage() {
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const router = useRouter();

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

  const getTierPrice = (tierName: string) => {
    if (tierName === "Free") return "$0";

    if (billingPeriod === "monthly") {
      return (
        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${MONTHLY_PRICE}</span>
            <span className="text-lg text-gray-500">/month</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-start">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${YEARLY_MONTHLY_PRICE}</span>
          <span className="text-lg text-gray-500">/month</span>
        </div>
        <div className="flex flex-col items-start mt-2">
          <span className="text-sm text-gray-500">billed annually at</span>
          <div className="flex items-center gap-2">
            <span className="text-base line-through text-gray-400">
              ${MONTHLY_TOTAL}
            </span>
            <span className="text-lg font-semibold text-purple-600">
              ${YEARLY_PRICE}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleUpgrade = async () => {
    if (!user) {
      return;
    }

    try {
      setIsLoading(true);
      const token = await user.getIdToken();

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_id: STRIPE_PRICE_IDS[billingPeriod],
          billing_period: billingPeriod,
          token,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        toast.error("Failed to create checkout session");
        return;
      }

      const stripe = await getStripe();
      if (!stripe) {
        toast.error("Something went wrong");
        return;
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        toast.error(stripeError.message || "Payment failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradeClick = () => {
    if (!user) {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              createdAt: new Date().toISOString(),
              isPro: false,
              products: [],
              totalItems: 0,
              lastLogin: new Date().toISOString(),
            });
          }
          handleUpgrade();
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          toast.error("Failed to sign in");
        });
      return;
    }
    handleUpgrade();
  };

  const getButtonText = (tierName: string) => {
    if (isLoading) return "Loading...";
    if (!user) return "Sign in to Upgrade";

    if (tierName === "Pro") {
      return isPro ? "Current Plan" : "Upgrade Now";
    }
    return isPro ? "Free Tier" : "Current Plan";
  };

  return (
    <div className="min-h-screen bg-grid-gray-200">
      <div className="bg-gradient-to-b from-transparent to-slate-50 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center mb-8">
            <h1 className="text-slate-900 tracking-tighter text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Upgrade Your Reselling Experience
            </h1>
            <p className="text-lg text-gray-600">
              Take your flipping game to the next level with flipassist Pro
            </p>
          </div>

          <PricingToggle
            billingPeriod={billingPeriod}
            setBillingPeriod={setBillingPeriod}
          />

          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mb-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-lg shadow-md overflow-hidden relative ${
                  tier.name === "Pro"
                    ? "border-2 border-purple-500"
                    : "border border-gray-200"
                }`}
              >
                {tier.name === "Pro" && billingPeriod === "yearly" && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                      <span className="font-medium">Best Value 🌟</span>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    {getTierPrice(tier.name)}
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
                    className={`w-full py-2 px-4 rounded-md transition-colors ${
                      tier.name === "Pro"
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-gray-500 hover:bg-gray-600 text-white"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading || (tier.name === "Pro" && isPro)}
                    onClick={
                      tier.name === "Pro" ? handleUpgradeClick : undefined
                    }
                  >
                    {getButtonText(tier.name)}
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
