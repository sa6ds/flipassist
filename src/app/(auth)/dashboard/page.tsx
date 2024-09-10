"use client";
import Sidebar from "../../components/Sidebar";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Header from "@/app/components/Header";
import { Tooltip } from "@mui/material";
import { generateChartData } from "@/app/utils/chartUtils";
import { Chart } from "chart.js";
import sneakerIcon from "../../assets/icons/recentActivity/shoe.svg";
import clothingIcon from "../../assets/icons/recentActivity/clothing.svg";
import packageIcon from "../../assets/icons/recentActivity/product.svg";
import collectibleIcon from "../../assets/icons/recentActivity/collectable.svg";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "@/app/components/Footer";
import { collection, doc, getDoc } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase";

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

const SummaryCard = ({
  icon: Icon,
  title,
  value,
  tooltip,
}: {
  icon: any;
  title: string;
  value: string | number;
  tooltip: string;
}) => (
  <div className="mb-5 w-full rounded-md px-4 py-4 shadow-lg drop-shadow-xl">
    <div className="flex pt-1">
      <Icon sx={{ fontSize: 32 }} className="mt-0.5" />
      <Tooltip title={tooltip}>
        <p className="ml-auto text-3xl text-slate-900 font-bold">{value}</p>
      </Tooltip>
    </div>
    <h2 className="mt-8 text-xl">{title}</h2>
  </div>
);

const RecentActivity = ({ products }: { products: Product[] }) => (
  <div className="h-[500px] w-full rounded-md py-2 shadow-lg drop-shadow-xl xl:ml-auto xl:h-auto xl:w-4/12">
    <h2 className="mx-8 my-5 text-2xl text-slate-900 font-bold">
      Recent Activity
    </h2>
    <div className="mx-8 text-xl">
      {products.slice(0, 7).map((product, index) => (
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
            ) : product.category === "Collectible" ? (
              <Image
                src={collectibleIcon as string}
                alt="Collectible Icon"
                className="not-highlightable w-6"
              />
            ) : (
              <Image
                src={packageIcon as string}
                alt="Package Icon"
                className="not-highlightable w-6"
              />
            )}
            <p className="ml-4 max-w-[50%] truncate">{product.name}</p>
            <p className="ml-auto">
              {new Date(product.dateAdded).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Dashboard() {
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInventoryValue, setTotalInventoryValue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

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
            <div className="mb-16 flex h-96 items-center justify-center rounded-md p-4 shadow-lg drop-shadow-xl md:h-[525px] xl:mb-0 xl:w-7/12">
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
    </div>
  );
}
