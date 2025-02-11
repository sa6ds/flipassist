"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, provider } from "./Firebase";
import { useEffect, useState } from "react";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { updateUserDocument } from "@/app/utils/firestoreUtils";
import Image from "next/image";

const features = [
  {
    title: "Inventory Management",
    description:
      "Keep track of all your items with our powerful inventory system",
    image: "/images/inventory-management.png", // Add your image path
  },
  {
    title: "Fee Calculators",
    description: "Calculate profits instantly across multiple platforms",
    image: "/images/calculator.png", // Add your image path
  },
  {
    title: "Reselling Tools",
    description: "Access essential tools to streamline your workflow",
    image: "/images/tools.png", // Add your image path
  },
  {
    title: "Price Monitors",
    description: "Stay updated with real-time price tracking",
    image: "/images/monitors.png", // Add your image path
  },
];

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [userIsPro, setUserIsPro] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch user's pro status
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUserIsPro(userDoc.data()?.isPro || false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          isPro: false,
          products: [],
          totalItems: 0,
          lastLogin: new Date().toISOString(),
        };
        await setDoc(doc(db, "users", user.uid), userData);
      } else {
        await updateDoc(doc(db, "users", user.uid), {
          lastLogin: new Date().toISOString(),
        });
      }

      router.push("/inventory");
    } catch (error) {
      console.error(error);
    }
  };

  // Helper function for pricing button action
  const handlePricingAction = async (tier: "free" | "pro") => {
    if (!user) {
      await signInWithGoogle();
      router.push("/inventory");
    } else {
      if (tier === "pro" && !userIsPro) {
        router.push("/upgrade");
      } else {
        router.push("/inventory");
      }
    }
  };

  return (
    <div className="bg-grid-gray-200 min-h-screen">
      <div className="bg-gradient-to-b from-transparent to-slate-50 min-h-screen">
        <Navbar />
        <main className="container mx-auto px-2 sm:px-8">
          {/* Hero Section */}
          <div className="mt-12 text-center mx-5 lg:mt-12">
            <div className="relative z-50">
              <h1 className="text-slate-900 z-50 pb-8 tracking-tighter text-4xl md:text-5xl lg:text-6xl font-bold">
                Streamline Your Reselling Game with Our Comprehensive Toolkit.
              </h1>
              <p className="z-50  text-lg lg:text-xl lg:mx-24 mb-10">
                Effortlessly manage inventory and simplify operations for
                efficient reselling success.
              </p>

              {/* Main CTA Button */}
              <Link href={user ? "/inventory" : "#"}>
                <button
                  onClick={!user ? signInWithGoogle : undefined}
                  className="w-fit px-6 py-3 border-2 animate-background-shine border-purple-600 bg-[linear-gradient(110deg,#9533F5,45%,#B468E3,55%,#9533F5)] bg-[length:200%_100%] shadow-3xl shadow-purple-500/30 hover:shadow-purple-500/60 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold text-white text-center">
                    {user
                      ? `Welcome back, ${user.displayName?.split(" ")[0]}!`
                      : "Get Started with flipassist Today!"}
                  </h3>
                  <p className="text-sm font-normal text-white/80 text-center">
                    {user
                      ? "Continue to dashboard"
                      : "No credit card required. Cancel anytime."}
                  </p>
                </button>
              </Link>
            </div>
          </div>

          {/* Video Demo Section */}
          <div className="mt-12 mb-24 px-4">
            <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-md md:shadow-2xl">
              <div className="aspect-video bg-gray-100">
                {/* Add your video demo here */}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-24 px-4">
            <h2 className="text-slate-900 tracking-tighter text-4xl lg:text-5xl font-bold text-center mb-4">
              Features that you&apos;ll love
            </h2>
            <p className="text-center text-lg lg:text-xl mb-12">
              We&apos;ve got you covered with everything you need to take your
              flipping game to the next level.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-16 px-4">
            <h2 className="text-slate-900 tracking-tighter text-4xl lg:text-5xl font-bold text-center mb-4">
              Pricing that fits your pocket!
            </h2>
            <p className="text-center text-lg lg:text-xl mb-8">
              Upgrade Your Reselling Experience - Take your flipping game to the
              next level with flipassist Pro
            </p>

            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className={`text-lg ${
                  !isYearly ? "text-purple-600" : "text-gray-600"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <span className="sr-only">Toggle pricing</span>
                <span
                  className={`${
                    isYearly ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
              <span
                className={`text-lg font-semibold ${
                  isYearly ? "text-purple-600" : "text-gray-600"
                }`}
              >
                Yearly
              </span>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free Tier */}
              <div className="p-6 rounded-xl bg-white shadow-md md:shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-3">Free</h3>
                <p className="text-gray-600 text-base mb-3">
                  For casual resellers
                </p>
                <p className="text-3xl md:text-4xl font-bold mb-6">$0</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    Intuitive dashboard
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    Profit tracking
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    Basic metrics
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    Profit calculator
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    Reselling tools
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    Up to 15 inventory items
                  </li>
                </ul>
                <button
                  onClick={() =>
                    userIsPro
                      ? router.push("/settings")
                      : handlePricingAction("free")
                  }
                  className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold"
                >
                  {!user
                    ? "Get Started"
                    : userIsPro
                    ? "Manage Membership"
                    : "Current Plan"}
                </button>
              </div>

              {/* Pro Tier */}
              <div className="p-6 rounded-xl bg-purple-600 text-white shadow-md md:shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-3">Pro</h3>
                <p className="text-purple-100 text-base mb-3">
                  For serious resellers
                </p>
                <p className="text-3xl md:text-4xl font-bold mb-6">
                  {isYearly ? "$99.90" : "$9.99"}
                  <span className="text-lg md:text-xl font-normal">
                    /{isYearly ? "year" : "month"}
                  </span>
                </p>
                {isYearly && (
                  <p className="text-sm text-purple-200 -mt-6 mb-8">
                    Billed annually (Save 20%)
                  </p>
                )}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-white mr-2" />
                    Everything in Free, plus:
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-white mr-2" />
                    Unlimited inventory items
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-white mr-2" />
                    Inventory export/import
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-white mr-2" />
                    Access to monitors page
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-white mr-2" />
                    Live prices from StockX and Goat
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-white mr-2" />
                    Priority support & feature requests
                  </li>
                </ul>
                <button
                  onClick={() => handlePricingAction("pro")}
                  className="w-full py-2.5 rounded-lg bg-white text-purple-600 hover:bg-purple-50 font-semibold"
                >
                  {!user
                    ? "Get Started"
                    : userIsPro
                    ? "Current Plan"
                    : "Upgrade Now"}
                </button>
              </div>
            </div>
          </div>
        </main>
        <div className="container mx-auto sticky top-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
