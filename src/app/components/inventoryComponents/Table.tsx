import React, { useState } from "react";
import trashIcon from "../../assets/icons/inventory/trash.svg";
import editIcon from "../../assets/icons/inventory/edit.svg";
import Image from "next/image";

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

interface TableProps {
  filteredProducts: Product[];
  handleStartEditing: (product: Product) => void;
  deleteProduct: (productId: string) => Promise<void>;
  handleSelectProduct: (productId: string) => void;
  selectedProducts: string[];
  isEditMode: boolean;
  selectAll: boolean;
  handleSelectAll: () => void;
}

const Table: React.FC<TableProps> = ({
  filteredProducts,
  handleStartEditing,
  deleteProduct,
  handleSelectProduct,
  selectedProducts,
  isEditMode,
  selectAll,
  handleSelectAll,
}) => {
  return (
    <div className="mb-24 rounded-md mt-6 hidden overflow-x-auto xl:block">
      <table className="w-full shadow-md overflow-x-auto truncate bg-white">
        <thead className="border-b-2">
          <tr>
            {isEditMode && (
              <th className="p-3 pr-4 text-slate-900 hover:bg-gray-100 text-center font-semibold">
                <input
                  type="checkbox"
                  className="w-4 h-4 mx-auto rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            <th className="p-3 pr-64 text-slate-900 hover:bg-gray-100 font-semibold">
              Name
            </th>
            <th className="p-3 pr-10 text-slate-900 hover:bg-gray-100 font-semibold">
              Size
            </th>
            <th className="p-3 pr-16 text-slate-900 hover:bg-gray-100 font-semibold">
              SKU
            </th>
            <th className="p-3 pr-6 text-slate-900 hover:bg-gray-100 font-semibold">
              Status
            </th>
            <th className="p-3 pr-5 text-slate-900 hover:bg-gray-100 font-semibold">
              Purchase Price
            </th>
            <th className="p-3 pr-5 text-slate-900 hover:bg-gray-100 font-semibold">
              Sale Price
            </th>
            <th className="p-3 pr-16 text-slate-900 hover:bg-gray-100 font-semibold">
              Profit
            </th>
            <th className="p-3 pr-8 text-slate-900 hover:bg-gray-100 font-semibold">
              Platform
            </th>
            <th className="p-3 pr-8 text-slate-900 hover:bg-gray-100 font-semibold">
              Category
            </th>
            <th className="p-3 pr-6 text-slate-900 hover:bg-gray-100 font-semibold">
              Purchase Date
            </th>
            <th className="p-3 pr-10 text-slate-900 hover:bg-gray-100 font-semibold">
              Sale Date
            </th>
            <th className="p-3 pr-10 text-slate-900 hover:bg-gray-100 font-semibold">
              Date Added
            </th>
            <th className="p-3 text-slate-900 hover:bg-gray-100 font-semibold">
              Notes
            </th>
            <th className="p-3 text-slate-900 hover:bg-gray-100 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr
              className={`hover:bg-slate-100 ${
                index % 2 === 0 ? "" : "bg-slate-50"
              }`}
              key={product.id}
            >
              {isEditMode && (
                <td className="p-3 text-sm text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mx-auto rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>
              )}
              <td
                className={`max-w-[350px] truncate text-sm p-3 cursor-pointer ${
                  isEditMode
                    ? "text-gray-700 font-semibold"
                    : "text-blue-500 hover:underline"
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
              </td>
              <td className="p-3 text-sm">{product.size || ""}</td>
              <td className="p-3 text-sm">{product.sku || ""}</td>
              <td className="p-3 text-sm">
                <p>{product.status}</p>
              </td>
              <td className="p-3 text-sm">
                {product.purchasePrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="p-3 text-sm">
                {product.salePrice?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                }) || ""}
              </td>
              {product.salePrice !== null && product.salePrice !== undefined ? (
                <td
                  className={`p-3 text-sm ${
                    product.salePrice - product.purchasePrice < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {(product.salePrice - product.purchasePrice).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    }
                  )}
                </td>
              ) : (
                <td></td>
              )}
              <td className="p-3 text-sm">{product.platform || ""}</td>
              <td className="p-3 text-sm">{product.category || ""}</td>
              <td className="p-3 text-sm">{product.purchaseDate}</td>
              <td className="p-3 text-sm">{product.saleDate || ""}</td>
              <td className="p-3 text-sm">{product.dateAdded}</td>
              <td className="p-3 text-sm max-w-[400px] truncate">
                {product.notes || ""}
              </td>
              <td className="flex justify-center items-center gap-3 p-2.5 ">
                <button onClick={() => handleStartEditing(product)}>
                  <Image
                    src={editIcon as string}
                    alt="Edit Icon"
                    className="not-highlightable w-4 text-red-700"
                  />
                </button>
                <button onClick={() => deleteProduct(product.id)}>
                  <Image
                    src={trashIcon as string}
                    alt="Trash Icon"
                    className="not-highlightable w-4 text-red-700"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
