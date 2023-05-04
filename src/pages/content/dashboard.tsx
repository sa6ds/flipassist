import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { FaShoePrints } from "react-icons/fa";
import Header from "~/Components/Header";
import Footer from "~/Components/Footer";

const DashboardPage: NextPage = () => {
  const [users, setUsers] = useState({ name: "" });

  useEffect(() => {
    setUsers({
      name: "saad",
    });
  }, []);

  const totalProducts = 999;
  const inventoryValue = 2542;
  const totalSales = 5420;
  const totalProfits = 8324;

  return (
    <div>
      <Sidebar name={users.name} />
      <div className="ml-0 truncate font-light md:ml-[300px]">
        <Header pageTitle="Inventory" />
        <div className="mx-8 my-10">
          <div className="mb-14 mt-10 xl:flex xl:justify-between xl:gap-[5%]">
            {/* SUMMARY */}
            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-2xl">
              <div className="flex pt-1">
                <InventoryOutlinedIcon sx={{ fontSize: 35 }} />
                <p className="ml-auto text-3xl font-bold">
                  {totalProducts.toLocaleString()}
                </p>
              </div>
              <h1 className="mt-8 text-xl">Total Inventory</h1>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-2xl">
              <div className="flex pt-1">
                <Inventory2OutlinedIcon sx={{ fontSize: 35 }} />
                <p className="ml-auto text-3xl font-bold">
                  ${inventoryValue.toLocaleString()}
                </p>
              </div>
              <h1 className="mt-8 text-xl">Inventory Value</h1>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-2xl">
              <div className="flex pt-1">
                <SellOutlinedIcon sx={{ fontSize: 35 }} />
                <p className="ml-auto text-3xl font-bold">
                  ${totalSales.toLocaleString()}
                </p>
              </div>
              <h1 className="mt-8 text-xl">Total Sales</h1>
            </div>

            <div className="mb-5 w-full rounded-md bg-gray-100 px-4 py-4 shadow-lg drop-shadow-2xl">
              <div className="flex pt-1">
                <SavingsOutlinedIcon sx={{ fontSize: 35 }} />
                <p className="ml-auto text-3xl font-bold">
                  ${totalProfits.toLocaleString()}
                </p>
              </div>
              <h1 className="mt-8 text-xl">Total Profit</h1>
            </div>
          </div>

          <div className="mt-14 xl:flex">
            {/* LINE CHART */}
            <div className="mb-16 h-[450px] w-full items-center rounded-md bg-gray-100 shadow-lg drop-shadow-2xl xl:mb-0 xl:w-7/12">
              <h1 className="text-center text-2xl">Insert Line Chart Here</h1>
            </div>

            {/* Recent Activity */}
            <div className="h-[450px] w-full rounded-md bg-gray-100 shadow-lg drop-shadow-2xl xl:mx-auto xl:w-4/12">
              <h1 className="pl-10 pt-6 text-2xl font-bold">Recent Activity</h1>
              <div className="mx-8 mt-8 text-xl">
                <div className="flex pb-8">
                  {/* TODO: FIX PADDING LEFT ON ICONS, INCONSISTENT!!! */}
                  <FaShoePrints size={30} />
                  <p className="max-w-[400px] truncate pl-8">
                    shoshoeshoeshoee
                  </p>
                  <p className="ml-auto">4/13/23</p>
                </div>
                <div className="flex pb-8">
                  <DiamondOutlinedIcon sx={{ fontSize: 35 }} />
                  <p className="max-w-[400px] truncate pl-6">collectable</p>
                  <p className="ml-auto">4/9/23</p>
                </div>
                <div className="flex pb-8">
                  <FaShoePrints size={30} />
                  <p className="max-w-[400px] truncate pl-8">shoe</p>
                  <p className="ml-auto">4/4/23</p>
                </div>
                <div className="flex pb-8">
                  <FaShoePrints size={30} />
                  <p className="max-w-[400px] truncate pl-8">shoe</p>
                  <p className="ml-auto">3/29/23</p>
                </div>
                <div className="flex pb-8">
                  <DiamondOutlinedIcon sx={{ fontSize: 35 }} />
                  <p className="max-w-[400px] truncate pl-6">collectable</p>
                  <p className="ml-auto">3/21/23</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:pl-[288px]">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
