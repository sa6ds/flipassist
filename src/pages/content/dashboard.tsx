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
import { listofproducts } from "../../Components/dummyData";
import { useEffect, useState } from "react";
import { faGem, faSocks, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardPage: NextPage = () => {
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInventoryValue, settotalInventoryValue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // Increments curr by 1 for each item in listofproducts
    const totalProducts = listofproducts.reduce((curr) => curr + 1, 0);
    setTotalProducts(totalProducts);

    // Represents sum of profits and current, including sold shoes
    // if profit > 0 then add sale price. otherwise add purchase price
    const totalInventoryValue = listofproducts.reduce((sum, product) => {
      const profit = (product.salePrice ?? 0) - product.purchasePrice;
      return profit > 0
        ? sum + (product.salePrice ?? 0)
        : sum + product.purchasePrice;
    }, 0);
    settotalInventoryValue(totalInventoryValue);

    // Represents how much made from sales
    // Make sum variable and loops over listofproducts, for each product adds product.salePrice to the sum, initialized sum at 0
    const totalSales = listofproducts.reduce((sum, product) => {
      return sum + (product.salePrice ?? 0);
    }, 0);
    setTotalSales(totalSales);

    const totalProfits = listofproducts.reduce((sum, product) => {
      // if no salePrice, skip item... if salePrice subtract from purchasePrice
      return product.salePrice == null || product.salePrice == 0
        ? sum
        : sum + product.salePrice - product.purchasePrice;
    }, 0);
    setTotalProfits(totalProfits);
  }, []);

  const sortedList = listofproducts.sort((a, b) => {
    const dateA = new Date(a.dateAdded).getTime();
    const dateB = new Date(b.dateAdded).getTime();
    return dateB - dateA;
  });

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
                <Inventory2OutlinedIcon
                  sx={{ fontSize: 32 }}
                  className="mt-0.5"
                />
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
            <div className="mb-16 h-[450px] w-full items-center rounded-md bg-gray-100 shadow-lg drop-shadow-xl xl:mb-0 xl:w-7/12">
              <h1 className="text-center text-2xl">Insert Line Chart Here</h1>
            </div>

            {/* Recent Activity */}
            <div className="h-[450px] w-full rounded-md bg-gray-100 shadow-lg drop-shadow-xl xl:ml-auto xl:w-4/12">
              <h1 className="ml-10 pt-6 text-2xl font-bold">Recent Activity</h1>

              {sortedList.slice(0, 6).map((product, index) => {
                return (
                  <div key={index} className="mx-8 my-8 text-xl">
                    <div className="flex">
                      {product.category === "Sneaker" ? (
                        <FontAwesomeIcon
                          className="ml-1 mt-1.5"
                          icon={faSocks}
                          size="sm"
                        />
                      ) : product.category === "Clothing" ? (
                        <FontAwesomeIcon
                          className="ml-1 mt-1.5"
                          icon={faTshirt}
                          size="sm"
                        />
                      ) : (
                        product.category === "Collectible" && (
                          <FontAwesomeIcon
                            className="ml-1 mt-1.5"
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
