import Sidebar from "../../Components/Sidebar";
import Header from "~/Components/Header";
import { requireAuthentication } from "~/utils/requireAuthentication";
import AddIcon from "@mui/icons-material/Add";

import type { GetServerSideProps, NextPage } from "next";
import Footer from "~/Components/Footer";
import PageHead from "~/utils/PageHead";
import { useState } from "react";
import { listofproducts } from "~/Components/dummyData";

const Inventory: NextPage = () => {
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
    <div className="min-h-[100vh]">
      <PageHead title="flipassist | Inventory" />
      <Sidebar />
      <div className="truncate font-light md:ml-[250px]">
        <Header pageTitle="Inventory" />
        <div className="mx-8 my-8 ">
          {/* UPPER PART */}

          <div className="xl:flex">
            <input
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-5 py-1.5 xl:w-4/12"
              placeholder="Search"
              onChange={(event) => {
                setSearchWord(event.target.value);
              }}
            />

            <div className="ml-auto mt-4 flex flex-wrap gap-3 xl:mt-0">
              <div className="gap-5">
                <button className="duration-1500w-14 w-12 rounded-md border border-black bg-gray-200 py-1.5 text-center transition-all hover:bg-white hover:text-black">
                  <AddIcon />
                </button>
              </div>
              <div className="flex">
                <select
                  name="status"
                  className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
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
                  className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
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
                  className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
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
          <div className="mb-24 mt-12 overflow-x-auto">
            <table className="w-full overflow-x-auto truncate">
              <thead className="border-b-2">
                <tr className="text-left font-extrabold">
                  <th className="p-3 pr-72 hover:bg-gray-100">Name</th>
                  <th className="p-3 pr-10 hover:bg-gray-100">Size</th>
                  <th className="p-3 pr-16 hover:bg-gray-100">SKU</th>
                  <th className="p-3 pr-6 hover:bg-gray-100">Status</th>
                  <th className="p-3 pr-5 hover:bg-gray-100">Purchase Price</th>
                  <th className="p-3 pr-5 hover:bg-gray-100">Sale Price</th>
                  <th className="p-3 pr-16 hover:bg-gray-100">Profit</th>
                  <th className="p-3 pr-8 hover:bg-gray-100">Platform</th>
                  <th className="p-3 pr-8 hover:bg-gray-100">Category</th>
                  <th className="p-3 pr-6 hover:bg-gray-100">Purchase Date</th>
                  <th className="p-3 pr-10 hover:bg-gray-100">Sale Date</th>
                  <th className="p-3 pr-10 hover:bg-gray-100">Date Added</th>
                  <th className="p-3 hover:bg-gray-100">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => {
                  return (
                    <tr
                      className={`h-10 hover:bg-gray-200 ${
                        index % 2 === 0 ? "" : "bg-gray-100"
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

                      {product.salePrice !== null ? (
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

                      {product.salePrice !== null ? (
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
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
    </div>
  );
};

export default Inventory;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await requireAuthentication(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentSession: session,
    },
  };
};
