"use client";
import Link from "next/link";

interface PremiumFeatureOverlayProps {
  title?: string;
  description?: string;
}

export default function PremiumFeatureOverlay({
  title = "Pro Feature",
  description = "Upgrade to Flip Assist Pro to unlock this feature.",
}: PremiumFeatureOverlayProps) {
  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-white/50 z-50">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-purple-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
        <p className="text-gray-600 text-center max-w-md mb-8">{description}</p>
        <Link href="/upgrade">
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Upgrade to Pro
          </button>
        </Link>
      </div>
    </div>
  );
}
