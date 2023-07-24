import React, { BaseSyntheticEvent } from "react";
import { SubmitHandler } from "react-hook-form";

interface Product {
  id: string;
  name: string;
  size?: string;
  sku?: string;
  status?: "Unlisted" | "Listed" | "Sold";
  platform?: string | null;
  category?: "Sneaker" | "Clothing" | "Collectible" | null;
  purchasePrice: number;
  salePrice?: number | null;
  purchaseDate: string;
  saleDate?: string | null;
  dateAdded: string;
  notes?: string | null;
}

interface AddModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  handleSubmit: (
    onSubmit: SubmitHandler<Product>
  ) => (e: BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<Product>;
  register: any; // update this with the correct type
  errors: any; // update this with the correct type
}

const AddModal: React.FC<AddModalProps> = ({
  isVisible,
  toggleModal,
  handleSubmit,
  onSubmit,
  register,
  errors,
}) => {
  return isVisible ? (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="relative mx-4 md:mx-14  w-full sm:w-[500px] bg-white rounded-lg shadow ">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          onClick={toggleModal}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="px-6 py-6 ">
          <h3 className="mb-4 text-xl font-medium text-gray-900">
            Add Product
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Product Name */}
            <div className="mb-4">
              <div className="my-0">
                {errors.name && (
                  <p className="text-purple-500 mb-2 px-4 py-2 bg-purple-50 rounded-lg font-bold text-sm">
                    • {errors.name.message}
                  </p>
                )}
                {errors.purchasePrice && (
                  <p className="text-purple-500 mb-2 px-4 py-2 bg-purple-50 rounded-lg font-bold text-sm">
                    • {errors.purchasePrice.message}
                  </p>
                )}
                {errors.purchaseDate && (
                  <p className="text-purple-500 mb-2 px-4 py-2 bg-purple-50 rounded-lg font-bold text-sm">
                    • {errors.purchaseDate.message}
                  </p>
                )}

                <label
                  htmlFor="name"
                  className="block text-sm mb-2 font-medium text-gray-900 "
                >
                  Product Name
                </label>
              </div>

              <input
                id="name"
                {...register("name", {
                  required: "Product name is required",
                })}
                className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              />
              {/* <input type="text" className="border px-5 py-1.5 xl:w-4/12 border-gray-200 w-full rounded-lg flex" /> */}
            </div>

            <div className="flex justify-between">
              {/* Size */}
              <div className="mb-4">
                <label
                  htmlFor="size"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  {...register("size")}
                  className="p-2 sm:w-32 w-24  text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* SKU */}
              <div className="mb-4">
                <label
                  htmlFor="sku"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  {...register("sku")}
                  className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Status
                  </label>
                </div>
                <select
                  id="status"
                  {...register("status", {
                    required: "Status is required",
                  })}
                  className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Unlisted">Unlisted</option>
                  <option value="Listed">Listed</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              {/* Purchase Price */}
              <div className="mb-4">
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Purchase Price
                  </label>
                </div>
                <input
                  step={0.01}
                  type="number"
                  id="purchasePrice"
                  {...register("purchasePrice", {
                    required: "Purchase price is required",
                    valueAsNumber: true,
                  })}
                  className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Sale Price */}
              <div className="mb-4">
                <label
                  htmlFor="salePrice"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Sale Price
                </label>
                <input
                  type="number"
                  id="salePrice"
                  {...register("salePrice", {
                    valueAsNumber: true,
                  })}
                  className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Platform */}
              <div className="mb-4">
                <label
                  htmlFor="platform"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Platform
                </label>
                <select
                  id="platform"
                  {...register("platform")}
                  className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Platform</option>
                  <option value="StockX">StockX</option>
                  <option value="Goat">Goat</option>
                  <option value="Depop">Depop</option>
                  <option value="eBay">eBay</option>
                  <option value="OfferUp">OfferUp</option>
                  <option value="Mercari">Mercari</option>
                  <option value="Grailed">Grailed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-between">
              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <select
                  id="category"
                  {...register("category")}
                  className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Sneaker">Sneaker</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Collectible">Collectible</option>
                </select>
              </div>

              {/* Purchase Date */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Purchase Date
                  </label>
                </div>
                <input
                  type="date"
                  id="purchaseDate"
                  {...register("purchaseDate", {
                    required: "Purchase date is required",
                  })}
                  className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Sale Date */}
              <div className="mb-4">
                <label
                  htmlFor="saleDate"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Sale Date
                </label>
                <input
                  type="date"
                  id="saleDate"
                  {...register("saleDate")}
                  className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label
                htmlFor="notes"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Notes
              </label>
              <textarea
                maxLength={32}
                id="notes"
                {...register("notes")}
                className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full duration-1500 rounded-lg bg-green-500 hover:bg-green-600 border border-green-600 py-1.5 text-center text-white transition-all"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddModal;
