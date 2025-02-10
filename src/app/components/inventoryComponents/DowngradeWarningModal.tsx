import Link from "next/link";

interface DowngradeWarningModalProps {
  totalItems: number;
  onClose: () => void;
}

export default function DowngradeWarningModal({
  totalItems,
  onClose,
}: DowngradeWarningModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative mx-4 md:mx-14 w-full max-w-[500px] bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Action Required: Inventory Limit Exceeded
          </h3>
          <div className="space-y-3 text-gray-600">
            <p>
              Your account has been downgraded to the free plan, but you
              currently have {totalItems} items in your inventory. The free plan
              limit is 15 items.
            </p>
            <p className="font-medium text-red-500">
              Important: In 3 days, your inventory will automatically be reduced
              to the 15 oldest items unless you take action.
            </p>
            <p>To keep all your items, you have two options:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Manually reduce your inventory to 15 items or fewer</li>
              <li>Resubscribe to the Pro plan</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            I&apos;ll do it later
          </button>
          <Link
            href="/upgrade"
            className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 text-center"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    </div>
  );
}
