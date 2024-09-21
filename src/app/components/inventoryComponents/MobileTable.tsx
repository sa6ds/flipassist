import Image from "next/image";
import React, { useState } from "react";
import trashIcon from "../../assets/icons/inventory/trash.svg";
import editIcon from "../../assets/icons/inventory/edit.svg";

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

interface Props {
  filteredProducts: Product[];
  deleteProduct: (productId: string) => void;
  handleStartEditing: (product: Product) => void;
  handleUpdateProduct: (e: React.FormEvent, productId: string) => Promise<void>;
  editingProductId: string | null;
  setEditingProductId: React.Dispatch<React.SetStateAction<string | null>>;
  handleSelectProduct: (productId: string) => void;
  selectedProducts: string[];
  isEditMode: boolean;
}

const MobileTable: React.FC<Props> = ({
  filteredProducts,
  deleteProduct,
  handleStartEditing,
  handleUpdateProduct,
  editingProductId,
  setEditingProductId,
  handleSelectProduct,
  selectedProducts,
  isEditMode,
}) => {
  const [deleteSelectedModalVisible, setDeleteSelectedModalVisible] =
    useState(false);

  const toggleDeleteSelectedModal = () => {
    setDeleteSelectedModalVisible((prevState) => !prevState);
  };

  const handleDeleteSelectedProducts = () => {
    selectedProducts.forEach((productId) => deleteProduct(productId));
    setDeleteSelectedModalVisible(false);
  };

  return (
    <div className="justify-center sm:flex sm:flex-wrap sm:gap-5 xl:hidden">
      {filteredProducts.map((product, index) => {
        return (
          <div key={index}>
            <div className="mt-8 h-fit rounded-md px-5 py-5 shadow-lg sm:w-[450px]">
              <div className="flex gap-2 ">
                {isEditMode && (
                  <input
                    type="checkbox"
                    className="w-5 h-5 my-auto"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                )}
                <p
                  className={`max-w-[300px] truncate text-lg font-extrabold text-blue-500 ${
                    isEditMode ? "cursor-pointer" : ""
                  }`}
                  onClick={() => isEditMode && handleStartEditing(product)}
                >
                  {isEditMode ? (
                    <span>{product.name}</span>
                  ) : (
                    <a
                      target="_blank"
                      href={`https://stockx.com/search?s=${product.name}`}
                    >
                      {product.name}
                    </a>
                  )}
                </p>
                <div className="mt-1.5 ml-auto flex gap-3">
                  <div>
                    <button onClick={() => handleStartEditing(product)}>
                      <Image
                        src={editIcon as string}
                        alt="Edit Icon"
                        className="not-highlightable w-5 text-red-700"
                      />
                    </button>
                  </div>
                  <div>
                    <button onClick={() => deleteProduct(product.id)}>
                      <Image
                        src={trashIcon as string}
                        alt="Trash Icon"
                        className="not-highlightable w-5 text-red-700"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="xsm:flex">
                <div>
                  {product.size && (
                    <>
                      <p className="mt-4 font-bold">Size:</p> {product.size}
                    </>
                  )}
                  {product.platform && (
                    <>
                      <p className="mt-4 font-bold">Platform:</p>
                      {product.platform}
                    </>
                  )}
                  <p className="mt-4 font-bold">Purchase Date: </p>
                  {new Date(product.purchaseDate).toLocaleDateString("en-US")}
                  <p className="mt-4 font-bold">Purchase Price: </p>
                  {product.purchasePrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                <div className="ml-auto">
                  {product.sku && (
                    <>
                      <p className="mt-4 font-bold">SKU:</p>
                      {product.sku}
                    </>
                  )}
                  {product.saleDate && (
                    <>
                      <p className="mt-4 font-bold">Sale Date:</p>
                      {product.saleDate}
                    </>
                  )}
                  {product.salePrice !== null && (
                    <>
                      <p className="mt-4 font-bold">Sale Price:</p>
                      {product.salePrice}
                    </>
                  )}
                </div>
              </div>
              {product.notes && (
                <div className="mt-8">
                  <p className="font-bold">Notes:</p>
                  <p className="whitespace-break-spaces">{product.notes}</p>
                </div>
              )}

              <div className="mt-5 flex">
                <div
                  className={`flex shadow-md items-center rounded-2xl ${
                    product.status === "Listed"
                      ? "bg-yellow-200"
                      : product.status === "Unlisted"
                      ? "bg-gray-200"
                      : "bg-green-200"
                  } px-8 py-1`}
                >
                  <p>{product.status}</p>
                </div>
                {product.salePrice !== null &&
                product.salePrice !== undefined ? (
                  <div className="ml-auto flex items-center rounded-md shadow-md px-4 py-2">
                    <p>
                      Profit:{" "}
                      <span
                        className={
                          product.salePrice - product.purchasePrice > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {(
                          product.salePrice - product.purchasePrice
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}

      {/* DELETE SELECTED CONFIRMATION MODAL */}
      {deleteSelectedModalVisible && (
        <div
          id="delete-selected-confirmation-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="relative mx-4 md:mx-14 w-full sm:w-[500px] bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              onClick={toggleDeleteSelectedModal}
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
            <div className="px-6 py-6">
              <h3 className="mb-4 text-xl text-gray-900">
                Are you sure you want to delete{" "}
                {selectedProducts.length === 1
                  ? filteredProducts.find(
                      (product) => product.id === selectedProducts[0]
                    )?.name
                  : `${selectedProducts.length} products`}
                ?
              </h3>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={toggleDeleteSelectedModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  onClick={handleDeleteSelectedProducts}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileTable;
