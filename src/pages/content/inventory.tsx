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
  const [searchWord, setsearchWord] = useState("");

  const filteredShoes = listofproducts.filter((shoe) => {
    return shoe.name.toLowerCase().includes(searchWord.toLowerCase());
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
                setsearchWord(event.target.value);
              }}
            />

            <div className="ml-auto mt-4 flex flex-wrap gap-3 xl:mt-0">
              <div className="gap-5">
                <button className="duration-1500w-14 w-12 rounded-md border border-black bg-gray-200 py-1.5 text-center transition-all hover:bg-white hover:text-black">
                  <AddIcon />
                </button>
              </div>
              <div className="flex">
                {/* <p>Status</p> */}
                <select
                  id="status"
                  name="status"
                  className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
                  required
                  placeholder="Status"
                >
                  <option disabled selected value="">
                    Status
                  </option>
                  <option value="Shipping">All</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Listed">Listed</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              <div>
                <select
                  id="platform"
                  name="platform"
                  className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
                  required
                >
                  <option disabled selected value="">
                    Platform
                  </option>
                  <option value="Shipping">All</option>
                  <option value="StockX">StockX</option>
                  <option value="Goat">Goat</option>
                  <option value="Depop">Depop</option>
                  <option value="eBay">eBay</option>
                  <option value="OfferUp">OfferUp</option>
                  <option value="Mercari">Mercari</option>
                </select>
              </div>
              <div>
                <select
                  id="category"
                  name="category"
                  className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
                  required
                >
                  <option disabled selected value="">
                    Category
                  </option>
                  <option value="Shipping">All</option>
                  <option value="Sneaker">Sneaker</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Collectable">Collectable</option>
                </select>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="mb-24 mt-12 overflow-x-auto">
            <table className="w-full overflow-x-auto truncate">
              <thead className="border-b-2">
                <tr className="text-left font-extrabold tracking-wide">
                  <th className="p-3 pr-72 hover:bg-gray-100">Name</th>
                  <th className="p-3 pr-10 hover:bg-gray-100">Size</th>
                  <th className="p-3 pr-24 hover:bg-gray-100">SKU</th>
                  <th className="p-3 pr-14 hover:bg-gray-100">Status</th>

                  <th className="p-3 pr-12 hover:bg-gray-100">
                    Purchase Price
                  </th>
                  <th className="p-3 pr-16 hover:bg-gray-100">Sale Price</th>
                  <th className="p-3 pr-16 hover:bg-gray-100">Profit</th>
                  <th className="p-3 pr-8 hover:bg-gray-100">Platform</th>
                  <th className="p-3 pr-8 hover:bg-gray-100">Category</th>
                  <th className="p-3 pr-6 hover:bg-gray-100">Purchase Date</th>
                  <th className="p-3 pr-10 hover:bg-gray-100">Sale Date</th>
                  <th className="p-3 pr-10 hover:bg-gray-100">Date Added</th>
                  <th className="p-3 hover:bg-gray-100">Notes</th>
                </tr>
              </thead>
              <tbody className="truncate">
                {filteredShoes.map((product, index) => {
                  return (
                    <tr
                      className={`h-10 hover:bg-gray-200 ${
                        index % 2 === 0 ? "" : "bg-gray-100"
                      }`}
                      key={index}
                    >
                      <td className="p-3 text-blue-400 hover:underline">
                        {product.name}
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
