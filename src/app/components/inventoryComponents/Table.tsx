import React from "react";

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
}

const Table: React.FC<TableProps> = ({
  filteredProducts,
  handleStartEditing,
  deleteProduct,
}) => {
  return (
    <div className="mb-24 rounded-md mt-6 hidden overflow-x-auto xl:block">
      <table className="w-full overflow-x-auto truncate">
        <thead className="border-b-2">
          {/* TODO: Add Sort Functionality */}
          <tr className="text-left font-extrabold">
            <th className="p-3 pr-64 text-slate-900 hover:bg-gray-100">Name</th>
            <th className="p-3 pr-10 text-slate-900 hover:bg-gray-100">Size</th>
            <th className="p-3 pr-16 text-slate-900 hover:bg-gray-100">SKU</th>
            <th className="p-3 pr-6 text-slate-900 hover:bg-gray-100">
              Status
            </th>
            <th className="p-3 pr-5 text-slate-900 hover:bg-gray-100">
              Purchase Price
            </th>
            <th className="p-3 pr-5 text-slate-900 hover:bg-gray-100">
              Sale Price
            </th>
            <th className="p-3 pr-16 text-slate-900 hover:bg-gray-100">
              Profit
            </th>
            <th className="p-3 pr-8 text-slate-900 hover:bg-gray-100">
              Platform
            </th>
            <th className="p-3 pr-8 text-slate-900 hover:bg-gray-100">
              Category
            </th>
            <th className="p-3 pr-6 text-slate-900 hover:bg-gray-100">
              Purchase Date
            </th>
            <th className="p-3 pr-10 text-slate-900 hover:bg-gray-100">
              Sale Date
            </th>
            <th className="p-3 pr-10 text-slate-900 hover:bg-gray-100">
              Date Added
            </th>
            <th className="p-3 text-slate-900 hover:bg-gray-100">Notes</th>
            <th className="p-3 text-slate-900 hover:bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr
              className={`hover:bg-slate-200 ${
                index % 2 === 0 ? "" : "bg-slate-100"
              }`}
              key={product.id}
            >
              <td className="max-w-[350px] truncate text-sm p-3 text-blue-500 hover:underline">
                <a
                  target="_blank"
                  href={`https://stockx.com/search?s=${product.name}`}
                >
                  {product.name}
                </a>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>

                <div className="">
                  <button onClick={() => deleteProduct(product.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3 mt-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
