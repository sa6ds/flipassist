"use client";
import { Product } from "@/app/types";
import { SummaryCard } from "@/app/components/dashboard/SummaryCard";
import { RecentActivity } from "@/app/components/dashboard/RecentActivity";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Header from "@/app/components/Header";
import { Tooltip } from "@mui/material";
import { generateChartData } from "@/app/utils/chartUtils";
import { Chart } from "chart.js";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "@/app/components/Footer";
import { collection, doc, getDoc } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase";
import Sidebar from "@/app/components/Sidebar";
import { useSearchParams } from "next/navigation";
import WelcomeProModal from "@/app/components/WelcomeProModal";

export default function Dashboard() {
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInventoryValue, setTotalInventoryValue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const userRef = doc(usersCollectionRef, user?.uid || "");
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      if (userData?.products) {
        const productsWithId = userData.products
          .filter((product: Product) => product.id)
          .map((product: Product) => ({ ...product, id: product.id }));
        setProducts(productsWithId);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchProducts();
      }
    });
    return () => unsubscribe();
  }, [fetchProducts]);

  useEffect(() => {
    const totalProducts = products.length;
    setTotalProducts(totalProducts);

    const totalInventoryValue = products.reduce(
      (sum, product) =>
        product.salePrice !== null && product.salePrice !== undefined
          ? sum
          : sum + product.purchasePrice,
      0
    );
    setTotalInventoryValue(totalInventoryValue);

    const totalSales = products.reduce(
      (sum, product) => sum + (product.salePrice ?? 0),
      0
    );
    setTotalSales(totalSales);

    const totalProfits = products.reduce(
      (sum, product) =>
        product.salePrice !== null && product.salePrice !== undefined
          ? sum + (product.salePrice - product.purchasePrice)
          : sum,
      0
    );
    setTotalProfits(totalProfits);
  }, [products]);

  useEffect(() => {
    if (searchParams.get("payment_success") === "true") {
      setShowWelcomeModal(true);
    }
  }, [searchParams]);

  const sortedRecentActivity = products.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chartData = generateChartData(products);
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
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current = new Chart(ctx, chartConfig);
      }
    }
  }, [products]);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Dashboard" />
        <div className="mx-8 my-8">
          <div className="mb-14 mt-10 xl:flex xl:justify-between xl:gap-[5%]">
            <SummaryCard
              icon={InventoryOutlinedIcon}
              title="Total Inventory"
              value={totalProducts}
              tooltip="The Total Inventory refers to the overall quantity of items in your inventory."
            />
            <SummaryCard
              icon={Inventory2OutlinedIcon}
              title="Inventory Value"
              value={totalInventoryValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
              tooltip="The Inventory Value is the total worth of unsold items in your inventory."
            />
            <SummaryCard
              icon={SellOutlinedIcon}
              title="Total Sales"
              value={totalSales.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
              tooltip="The Total Sales represents the cumulative amount earned from all sales, including the product cost."
            />
            <SummaryCard
              icon={SavingsOutlinedIcon}
              title="Total Profit"
              value={totalProfits.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
              tooltip="The Total Profit is the amount earned from from sales minus the product cost."
            />
          </div>

          <div className="mt-14 xl:flex">
            <div className="mb-16 flex h-96 items-center justify-center rounded-md p-4 shadow-md md:h-[525px] xl:mb-0 xl:w-7/12 bg-white">
              <canvas aria-label="Chart" role="img" id="myChart" ref={chartRef}>
                <h2>Line Chart Here</h2>
              </canvas>
            </div>
            <RecentActivity products={sortedRecentActivity} />
          </div>
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>
      <WelcomeProModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
    </div>
  );
}
