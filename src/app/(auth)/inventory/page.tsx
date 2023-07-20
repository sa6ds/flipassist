"use client";
import Sidebar from "../../components/Sidebar";
import Header from "@/app/components/Header";
import AddIcon from "@mui/icons-material/Add";
import { listofproducts } from "@/app/utils/dummyData";
import Footer from "@/app/components/Footer";
import { useState } from "react";

export default function Inventory() {
  const [searchWord, setSearchWord] = useState("");
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");

  const filteredProducts = listofproducts.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchWord.toLowerCase());

    const statusMatch = status === "" || product.status === status;
    const platformMatch = platform === "" || product.platform === platform;
    const categoryMatch = category === "" || product.category === category;

    return nameMatch && statusMatch && platformMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Inventory" />

        <div className="mx-8 my-8">
          {/* UPPER PART */}
          <div className="xl:flex">
            <input
              type="text"
              placeholder="Search"
              onChange={(event) => {
                setSearchWord(event.target.value);
              }}
              name="search"
              className="border px-5 py-1.5 xl:w-4/12 border-gray-200 w-full rounded-lg flex"
            ></input>

            <div className="ml-auto mt-4 flex flex-wrap gap-3 xl:mt-0">
              <div className="gap-5">
                <button className="duration-1500w-14 w-12 rounded-md border border-black bg-gray-200 py-1.5 text-center transition-all hover:bg-white hover:text-black">
                  <AddIcon />
                </button>
              </div>
              <div className="flex">
                <select
                  name="status"
                  className="duration-1500 h-10 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
                  placeholder="Status"
                  onChange={(event) => setStatus(event.target.value)}
                  defaultValue={"Status"}
                >
                  <option disabled value="Status">
                    Status
                  </option>
                  <option value="">All</option>
                  <option value="Listed">Listed</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              <div>
                <select
                  name="platform"
                  className="duration-1500 h-10 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
                  onChange={(event) => setPlatform(event.target.value)}
                  defaultValue={"Platform"}
                >
                  <option disabled value="Platform">
                    Platform
                  </option>
                  <option value="">All</option>
                  <option value="StockX">StockX</option>
                  <option value="Goat">Goat</option>
                  <option value="eBay">eBay</option>
                  <option value="Grailed">Grailed</option>
                  <option value="Depop">Depop</option>
                  <option value="OfferUp">OfferUp</option>
                  <option value="Mercari">Mercari</option>
                </select>
              </div>
              <div>
                <select
                  id="category"
                  name="category"
                  className="duration-1500 h-10 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
                  onChange={(event) => setCategory(event.target.value)}
                  defaultValue={"Category"}
                >
                  <option disabled value="Category">
                    Category
                  </option>
                  <option value="">All</option>
                  <option value="Sneaker">Sneaker</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Collectible">Collectible</option>
                </select>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="mb-24 rounded-md mt-12 hidden overflow-x-auto xl:block">
            <table className="w-full overflow-x-auto truncate">
              <thead className="border-b-2">
                {/* TODO: Add Sort Functionality */}
                <tr className="text-left font-extrabold">
                  <th className="p-3 pr-72 text-slate-900 hover:bg-gray-100">
                    Name
                  </th>
                  <th className="p-3 pr-10 text-slate-900 hover:bg-gray-100">
                    Size
                  </th>
                  <th className="p-3 pr-16 text-slate-900 hover:bg-gray-100">
                    SKU
                  </th>
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
                  <th className="p-3 text-slate-900 hover:bg-gray-100">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => {
                  return (
                    <tr
                      className={`h-10 hover:bg-slate-200 ${
                        index % 2 === 0 ? "" : "bg-slate-100"
                      }`}
                      key={index}
                    >
                      <td className="max-w-[350px] truncate p-3 text-blue-500 hover:underline">
                        <a
                          target="_blank"
                          href={`https://stockx.com/search?s=${product.name}`}
                        >
                          {product.name}
                        </a>
                      </td>

                      <td className="p-3 text-sm">{product.size}</td>
                      <td className="p-3 text-sm">{product.sku}</td>
                      <td className="p-3 text-sm">{product.status}</td>
                      <td className="p-3 text-sm">
                        {product.purchasePrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      {product.salePrice ? (
                        <td className="p-3 text-sm">
                          {product.salePrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          })}
                        </td>
                      ) : (
                        <td className="p-3 text-sm"></td>
                      )}

                      {product.salePrice ? (
                        <td
                          className={`p-3 text-sm ${
                            product.salePrice - product.purchasePrice < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {(
                            product.salePrice - product.purchasePrice
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          })}
                        </td>
                      ) : (
                        <td className="p-3 text-sm text-red-500">
                          -
                          {product.purchasePrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          })}
                        </td>
                      )}

                      <td className="p-3 text-sm">{product.platform}</td>
                      <td className="p-3 text-sm">{product.category}</td>
                      <td className="p-3 text-sm">{product.purchaseDate}</td>
                      <td className="p-3 text-sm">{product.saleDate}</td>
                      <td className="p-3 text-sm">{product.dateAdded}</td>
                      <td className="max-w-[400px] truncate p-3">
                        {product.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW */}
          <div className="justify-center sm:flex sm:flex-wrap sm:gap-5 xl:hidden">
            {filteredProducts.map((product, index) => {
              return (
                <div key={index}>
                  <div className="">
                    <div className="mt-8 h-fit rounded-md bg-gray-100 px-5 py-5 shadow-lg drop-shadow-xl sm:w-[450px]">
                      <div className="flex">
                        <p className="max-w-[300px] truncate text-lg font-extrabold text-blue-500">
                          <a
                            target="_blank"
                            href={`https://stockx.com/search?s=${product.name}`}
                          >
                            {product.name}
                          </a>
                        </p>
                        <p className="ml-auto mt-0.5">{product.purchaseDate}</p>
                      </div>
                      <div className="xsm:flex">
                        <div className="">
                          <p className="mt-4">{product.size}</p>
                          <p className="mt-4">{product.platform}</p>
                          <p className="mt-4">
                            Purchase Price:{" "}
                            {product.purchasePrice.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <p className="mt-4">SKU: {product.sku}</p>
                          <p className="mt-4">
                            Sale Date:{" "}
                            {product.saleDate ? product.saleDate : "N/A"}
                          </p>
                          <p className="mt-4">
                            Sale Date:{" "}
                            {product.salePrice ? product.salePrice : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex">
                        <div
                          className={`flex items-center rounded-2xl ${
                            product.status == "Listed"
                              ? "bg-yellow-300"
                              : "bg-green-300"
                          } px-8 py-1`}
                        >
                          <p>{product.status}</p>
                        </div>

                        {product.salePrice && (
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
    </div>
  );
}
