import Image from "next/image";
import React from "react";
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
  handleUpdateProduct: (e: React.FormEvent, productId: string) => void;
  setEditingProductId: React.Dispatch<React.SetStateAction<string | null>>;
  editingProductId: string | null;
}

const MobileTable: React.FC<Props> = ({
  filteredProducts,
  deleteProduct,
  handleStartEditing,
  handleUpdateProduct,
  editingProductId,
  setEditingProductId,
}) => {
  return (
    <div className="justify-center sm:flex sm:flex-wrap sm:gap-5 xl:hidden">
      {filteredProducts.map((product, index) => {
        return (
          <div key={index}>
            <div className="mt-8 h-fit rounded-md px-5 py-5 shadow-lg sm:w-[450px]">
              <div className="flex gap-2">
                <p className="max-w-[300px] truncate text-lg font-extrabold text-blue-500">
                  <a
                    target="_blank"
                    href={`https://stockx.com/search?s=${product.name}`}
                  >
                    {product.name}
                  </a>
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
    </div>
  );
};

export default MobileTable;
