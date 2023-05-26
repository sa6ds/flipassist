import Sidebar from "../../Components/Sidebar";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Header from "~/Components/Header";
import Footer from "~/Components/Footer";
import { requireAuthentication } from "~/utils/requireAuthentication";
import type { GetServerSideProps, NextPage } from "next";
import PageHead from "~/utils/PageHead";
import { listofproducts } from "../../utils/dummyData";
import { useEffect, useRef, useState } from "react";
import { faGem, faSocks, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// TODO: YEESH THATS ALOT
import { Chart } from "chart.js";
import { Tooltip } from "@mui/material";
import { generateChartData } from "~/utils/chartUtils";

const DashboardPage: NextPage = () => {
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
    <div className="min-h-[100vh]">
      <PageHead title="flipassist | Dashboard" />

      <Sidebar />

      <div className="ml-0 truncate font-light md:ml-[250px]">
        <Header pageTitle="Dashboard" />

        <div className="mx-8 my-10">
          <div className="mb-14 mt-10 xl:flex xl:justify-between xl:gap-[5%]">
            {/* SUMMARY */}
            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-xl">
              <div className="flex pt-1">
                <InventoryOutlinedIcon
                  sx={{ fontSize: 32 }}
                  className="mt-0.5"
                />
                <p className="ml-auto text-3xl font-bold">{totalProducts}</p>
              </div>
              <h1 className="mt-8 text-xl">Total Inventory</h1>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-xl">
              <div className="flex pt-1">
                {/* TODO: ADD TOOL TIP TO REST OF ICONS BROOO, OR MAYBE NAME OF DIV? OR VALUE? */}
                <Tooltip title="Your Inventory Value is exactly how much your inventory (all unsold items) is worth">
                  <div>
                    <Inventory2OutlinedIcon
                      sx={{ fontSize: 32 }}
                      className="mt-0.5"
                    />
                  </div>
                </Tooltip>

                <p className="ml-auto text-3xl font-bold">
                  {totalInventoryValue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <h1 className="mt-8 text-xl">Inventory Value</h1>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-xl">
              <div className="flex pt-1">
                <SellOutlinedIcon sx={{ fontSize: 32 }} className="mt-0.5" />
                <p className="ml-auto text-3xl font-bold">
                  {totalSales.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <h1 className="mt-8 text-xl">Total Sales</h1>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-xl">
              <div className="flex pt-1">
                <SavingsOutlinedIcon sx={{ fontSize: 32 }} className="mt-0.5" />
                <p className="ml-auto text-3xl font-bold">
                  {totalProfits.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <h1 className="mt-8 text-xl">Total Profit</h1>
            </div>
          </div>

          <div className="mt-14 xl:flex">
            {/* LINE CHART */}
            <div className="mb-16 flex items-center justify-center rounded-md bg-gray-100 p-4 shadow-lg drop-shadow-xl xl:mb-0 xl:h-auto xl:w-7/12">
              <canvas aria-label="Chart" role="img" id="myChart" ref={chartRef}>
                <h1>Line Chart Here</h1>
              </canvas>
            </div>

            {/* Recent Activity */}
            <div className="w-full rounded-md bg-gray-100 py-2 shadow-lg drop-shadow-xl xl:ml-auto xl:w-4/12">
              <h1 className="mx-8 my-5  text-2xl font-bold">Recent Activity</h1>

              <div className="mx-8 text-xl">
                {sortedRecentActivity.slice(0, 7).map((product, index) => {
                  return (
                    <div key={index} className="my-8">
                      <div className="flex">
                        {product.category === "Sneaker" ? (
                          // TODO: FIX BIG SOCKS ON FIRST LOAD
                          <FontAwesomeIcon
                            className="mt-1.5"
                            icon={faSocks}
                            size="sm"
                          />
                        ) : product.category === "Clothing" ? (
                          <FontAwesomeIcon
                            className="mt-1.5"
                            icon={faTshirt}
                            size="sm"
                          />
                        ) : (
                          product.category === "Collectible" && (
                            <FontAwesomeIcon
                              className="mt-1.5"
                              icon={faGem}
                              size="sm"
                            />
                          )
                        )}
                        <p className="ml-3 max-w-[50%] truncate">
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
};

export default DashboardPage;

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
