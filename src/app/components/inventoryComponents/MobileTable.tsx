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
            <div className="mt-8 h-fit rounded-md bg-gray-100 px-5 py-5 shadow-lg drop-shadow-xl sm:w-[450px]">
              <div className="flex gap-2">
                <p className="max-w-[300px] truncate text-lg font-extrabold text-blue-500">
                  <a
                    target="_blank"
                    href={`https://stockx.com/search?s=${product.name}`}
                  >
                    {product.name}
                  </a>
                </p>
                {/* <p className="ml-auto mt-0.5">{product.purchaseDate}</p> */}
                <div className="mt-1.5 ml-auto flex gap-3">
                  <div>
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
                  </div>
                  <div>
                    <button onClick={() => deleteProduct(product.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
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
                  className={`flex items-center rounded-2xl ${
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
                  <div className="ml-auto flex items-center rounded-md bg-gray-300 px-4 py-2">
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
