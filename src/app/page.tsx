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
import { sendGAEvent } from "@next/third-parties/google";

const features = [
  {
    title: "Dashboard Analytics",
    description: "Track your performance with detailed analytics and insights",
    icon: (
      <svg
        className="w-12 h-12 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "Inventory Management",
    description:
      "Keep track of all your items with our powerful inventory system",
    icon: (
      <svg
        className="w-12 h-12 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Fee Calculators",
    description: "Calculate profits instantly across multiple platforms",
    icon: (
      <svg
        className="w-12 h-12 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Reselling Tools",
    description: "Access essential tools to streamline your workflow",
    icon: (
      <svg
        className="w-12 h-12 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
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
      // Send GA event for sign-up attempt
      sendGAEvent({
        event: "user_sign_up",
        category: "engagement",
        action: "sign_up_attempt",
        label: "google_auth",
      });

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

        // Send GA event for successful sign-up
        sendGAEvent({
          event: "user_sign_up_complete",
          category: "conversion",
          action: "sign_up_success",
          label: "new_user",
        });
      } else {
        await updateDoc(doc(db, "users", user.uid), {
          lastLogin: new Date().toISOString(),
        });

        // Send GA event for returning user login
        sendGAEvent({
          event: "user_login",
          category: "engagement",
          action: "login_success",
          label: "returning_user",
        });
      }

      router.push("/inventory");
    } catch (error) {
      console.error(error);
      sendGAEvent({
        event: "user_sign_up_error",
        category: "error",
        action: "sign_up_failed",
        label: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // Helper function for pricing button action
  const handlePricingAction = async (tier: "free" | "pro") => {
    if (!user) {
      sendGAEvent({
        event: "upgrade_view",
        category: "engagement",
        action: "pricing_view_unauthorized",
        label: tier,
      });

      await signInWithGoogle();
      router.push("/inventory");
    } else {
      if (tier === "pro" && !userIsPro) {
        sendGAEvent({
          event: "upgrade_view",
          category: "engagement",
          action: "pricing_view_authorized",
          label: `${tier}_from_main`,
        });

        router.push("/upgrade");
      } else {
        router.push("/inventory");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-[140vh] absolute top-0 left-0 right-0 bg-grid-gray-200 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="relative">
        <Navbar />
        <main className="container mx-auto px-2 sm:px-8">
          {/* Hero Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 mb-12 sm:mb-16 md:mb-24 lg:mb-32 text-center mx-5">
            <div className="relative z-50">
              <h1 className="text-slate-900 z-50 pb-8 tracking-tighter text-4xl md:text-5xl lg:text-6xl font-bold">
                Streamline Your Reselling Game with Our Comprehensive Toolkit.
              </h1>
              <p className="z-50  text-lg lg:text-xl lg:mx-24 mb-10">
                Effortlessly manage inventory and simplify operations for
                efficient reselling success.
              </p>

              {/* Main CTA Button */}
              <Link href={user ? "/dashboard" : "#"}>
                <button
                  onClick={() => {
                    if (!user) {
                      window.gtag("event", "sign_up_attempt", {
                        event_category: "engagement",
                        event_label: "hero_section",
                      });
                      signInWithGoogle();
                    }
                  }}
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
          <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-32 px-4">
            <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-md md:shadow-2xl">
              <div className="aspect-video bg-gray-100">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/assets/landing/demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-32 px-4">
            <h2 className="text-slate-900 tracking-tighter text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6">
              Features that you&apos;ll love
            </h2>
            <p className="text-center text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              We&apos;ve got you covered with everything you need to take your
              flipping game to the next level.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 p-8 min-h-[320px] flex flex-col"
                >
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-26 px-4">
            <h2 className="text-slate-900 tracking-tighter text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6">
              Pricing that fits your pocket!
            </h2>
            <p className="text-center text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              Take your flipping game to the next level with flipassist Pro
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
                className={`text-lg ${
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
              <div className="relative p-6 rounded-xl bg-purple-600 text-white shadow-md md:shadow-lg">
                {/* Best Value Badge with transition */}
                <div
                  className={`absolute -top-3 -right-3 transition-all duration-300 ease-in-out transform ${
                    isYearly
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="bg-yellow-400 text-purple-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    Best Value
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3">Pro</h3>
                <p className="text-purple-100 text-base mb-3">
                  For serious resellers
                </p>
                <p className="text-3xl md:text-4xl font-bold mb-1">
                  {isYearly ? "$8.33" : "$9.99"}
                  <span className="text-lg md:text-xl font-normal">/month</span>
                </p>
                {isYearly && (
                  <div className="text-sm text-purple-200 mb-8">
                    <p>billed annually at</p>
                    <div className="flex items-center gap-2">
                      <span className="line-through">$119.88</span>
                      <span className="font-bold">$99.99</span>
                    </div>
                  </div>
                )}
                <div className="mb-6"></div>
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
          <div className="flex justify-center mb-24">
            <a
              href="https://www.producthunt.com/posts/flipassist-app?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-flipassist&#0045;app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=879005&theme=neutral&t=1739691732156"
                alt="flipassist.app - Simplify Your Reselling Game with Our Comprehensive Toolkit"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </a>
          </div>
        </main>
        <div className="container mx-auto sticky top-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
