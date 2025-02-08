import { FC } from "react";

interface ProBadgeProps {
  size?: "sm" | "md" | "lg";
}

const ProBadge: FC<ProBadgeProps> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`${sizeClasses[size]} font-semibold rounded-full 
      bg-gradient-to-r from-purple-500 to-purple-600 
      text-white shadow-lg shadow-purple-500/30 
      animate-background-shine border border-purple-400/50
      flex items-center gap-1`}
    >
      <svg
        className="w-3 h-3"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      PRO
    </span>
  );
};

export default ProBadge;
