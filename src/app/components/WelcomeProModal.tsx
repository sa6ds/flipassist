import Link from "next/link";

interface WelcomeProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeProModal({
  isOpen,
  onClose,
}: WelcomeProModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative mx-4 md:mx-14 w-full max-w-[500px] bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-purple-600"
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
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Welcome to Pro! 🎉
          </h3>
          <div className="space-y-3 text-gray-600">
            <p className="text-center">
              Thank you for upgrading to Pro! You now have access to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Unlimited inventory items</li>
              <li>Monitor updates</li>
              <li>CSV import/export</li>
              <li>Live prices from StockX and Goat</li>
              <li>Priority support</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
