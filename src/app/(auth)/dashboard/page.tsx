"use client";
import Sidebar from "../../components/Sidebar";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Header from "@/app/components/Header";
import { listofproducts } from "@/app/utils/dummyData";
import { Tooltip } from "@mui/material";
import { generateChartData } from "@/app/utils/chartUtils";
import { Chart } from "chart.js";
import sneakerIcon from "../../assets/icons/recentActivity/shoe.svg";
import clothingIcon from "../../assets/icons/recentActivity/shirt.svg";
import collectibleIcon from "../../assets/icons/recentActivity/diamond.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Footer from "@/app/components/Footer";

export default function Dashboard() {
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInventoryValue, settotalInventoryValue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // Increments curr by 1 for each item in listofproducts
    const totalProducts = listofproducts.reduce((curr) => curr + 1, 0);
    setTotalProducts(totalProducts);

    // Represents sum of all unsold items is worth
    const totalInventoryValue = listofproducts.reduce((sum, product) => {
      return !product.salePrice ? sum + product.purchasePrice : sum;
    }, 0);
    settotalInventoryValue(totalInventoryValue);

    // Represents how much made from sales
    const totalSales = listofproducts.reduce((sum, product) => {
      return sum + (product.salePrice ?? 0);
    }, 0);
    setTotalSales(totalSales);

    // Represents profits made from only shoes that have been sold
    const totalProfits = listofproducts.reduce((sum, product) => {
      return product.salePrice
        ? sum + product.salePrice - product.purchasePrice
        : sum;
    }, 0);
    setTotalProfits(totalProfits);
  }, []);

  const sortedRecentActivity = listofproducts.sort((a, b) => {
    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
  });

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chartData = generateChartData();

        const chartConfig = {
          type: "line",
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  usePointStyle: true,
                  pointStyle: "rectRounded",
                },
              },
            },
          },
        };

        new Chart(ctx, chartConfig);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Dashboard" />
        <div className="mx-8 my-8">
          <div className="mb-14 mt-10 xl:flex xl:justify-between xl:gap-[5%]">
            {/* SUMMARY */}
            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-xl">
              <div className="flex pt-1">
                <InventoryOutlinedIcon
                  sx={{ fontSize: 32 }}
                  className="mt-0.5"
                />
                <Tooltip title="The Total Inventory refers to the overall quantity of items in your inventory.">
                  <p className="ml-auto text-3xl text-slate-900 font-bold">
                    {totalProducts}
                  </p>
                </Tooltip>
              </div>
              <h2 className="mt-8 text-xl">Total Inventory</h2>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-xl">
              <div className="flex pt-1">
                <Inventory2OutlinedIcon
                  sx={{ fontSize: 32 }}
                  className="mt-0.5"
                />
                <Tooltip title="The Inventory Value is the total worth of unsold items in your inventory.">
                  <p className="ml-auto text-3xl text-slate-900 font-bold">
                    {totalInventoryValue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </Tooltip>
              </div>
              <h2 className="mt-8 text-xl">Inventory Value</h2>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-xl">
              <div className="flex pt-1">
                <SellOutlinedIcon sx={{ fontSize: 32 }} className="mt-0.5" />
                <Tooltip title="The Total Sales represents the cumulative amount earned from all sales, including the product cost.">
                  <p className="ml-auto text-3xl text-slate-900 font-bold">
                    {totalSales.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </Tooltip>
              </div>
              <h2 className="mt-8 text-xl">Total Sales</h2>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-xl">
              <div className="flex pt-1">
                <SavingsOutlinedIcon sx={{ fontSize: 32 }} className="mt-0.5" />
                <Tooltip title="The Total Profit is the amount earned from from sales minus the product cost.">
                  <p className="ml-auto text-3xl text-slate-900 font-bold">
                    {totalProfits.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </Tooltip>
              </div>
              <h2 className="mt-8 text-xl">Total Profit</h2>
            </div>
          </div>

          <div className="mt-14 xl:flex">
            {/* LINE CHART */}
            <div className="mb-16 flex h-96 items-center justify-center rounded-md bg-gray-100 p-4 shadow-lg drop-shadow-xl md:h-[525px] xl:mb-0 xl:w-7/12">
              <canvas aria-label="Chart" role="img" id="myChart" ref={chartRef}>
                <h2>Line Chart Here</h2>
              </canvas>
            </div>

            {/* Recent Activity */}
            <div className="h-[500px] w-full rounded-md bg-gray-100 py-2 shadow-lg drop-shadow-xl xl:ml-auto xl:h-auto xl:w-4/12">
              <h2 className="mx-8 my-5 text-2xl text-slate-900 font-bold">
                Recent Activity
              </h2>

              <div className="mx-8 text-xl">
                {sortedRecentActivity.slice(0, 7).map((product, index) => {
                  return (
                    <div key={index} className="my-8">
                      <div className="mt-1 flex">
                        {product.category === "Sneaker" ? (
                          <Image
                            src={sneakerIcon as string}
                            alt="Shoe Icon"
                            className="not-highlightable w-6"
                          />
                        ) : product.category === "Clothing" ? (
                          <Image
                            src={clothingIcon as string}
                            alt="Shirt Icon"
                            className="not-highlightable w-6"
                          />
                        ) : (
                          product.category === "Collectible" && (
                            <Image
                              src={collectibleIcon as string}
                              alt="Collectible Icon"
                              className="not-highlightable w-6"
                            />
                          )
                        )}
                        <p className="ml-4 max-w-[50%] truncate">
                          {product.name}
                        </p>
                        <p className="ml-auto">{product.dateAdded}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
    </div>
  );
}
