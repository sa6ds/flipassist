"use client";
import Sidebar from "../../components/Sidebar";
import Header from "@/app/components/Header";
import AddIcon from "@mui/icons-material/Add";
import Footer from "@/app/components/Footer";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { User } from "@firebase/auth";

export default function Inventory() {
  const [searchWord, setSearchWord] = useState("");
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");

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

  const [displayName, setDisplayName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedProductName, setEditedProductName] = useState<string>("");
  const [editedProductSize, setEditedProductSize] = useState<string>("");
  const [editedProductSku, setEditedProductSku] = useState<string>("");
  const [editedProductStatus, setEditedProductStatus] = useState<
    "Unlisted" | "Listed" | "Sold"
  >("Unlisted");
  const [editedProductPrice, setEditedProductPrice] = useState<number>(0);
  const [editedProductSalePrice, setEditedProductSalePrice] =
    useState<number>(0);
  const [editedProductPlatform, setEditedProductPlatform] =
    useState<string>("");
  const [editedProductCategory, setEditedProductCategory] =
    useState<string>("");
  const [editedProductPurchaseDate, setEditedProductPurchaseDate] =
    useState<string>("");
  const [editedProductSaleDate, setEditedProductSaleDate] =
    useState<string>("");
  const [editedProductNotes, setEditedProductNotes] = useState<string>("");

  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const fetchProducts = useCallback(async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const userRef = doc(usersCollectionRef, user?.uid || "");

      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      if (userData?.products) {
        const productsWithId = userData.products
          .filter((product: Product) => product.id)
          .map((product: Product) => ({
            ...product,
            id: product.id,
          }));
        setProducts(productsWithId);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const existingProducts = userSnapshot.data()?.products || [];

      const updatedProducts = existingProducts ? existingProducts : [];

      const newProduct: Product = {
        id: uuidv4(),
        name: data.name,
        size: data.size,
        sku: data.sku,
        status: data.status,
        purchasePrice: data.purchasePrice,
        salePrice: data.salePrice || null,
        platform: data.platform || null,
        category: data.category || null,
        purchaseDate: data.purchaseDate,
        saleDate: data.saleDate || null,
        dateAdded: new Date().toISOString().split("T")[0], // Get the current date in the format "YYYY-MM-DD"
        notes: data.notes || null,
      };

      updatedProducts.push(newProduct);

      await setDoc(userRef, {
        email: user.email,
        displayName: displayName,
        products: updatedProducts,
      });

      setProducts(updatedProducts);

      reset();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      fetchProducts();
    }
  }, [user, fetchProducts]);

  const deleteProduct = async (productId: string) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const existingProducts = userSnapshot.data()?.products || [];

      const updatedProducts = existingProducts.filter(
        (product: Product) => product.id !== productId
      );

      await setDoc(userRef, {
        email: user.email,
        displayName: displayName,
        products: updatedProducts,
      });

      setProducts(updatedProducts);
    }
  };
  const handleStartEditing = (product: Product) => {
    setEditingProductId(product.id);
    setEditedProductName(product.name);
    setEditedProductSize(product.size || "");
    setEditedProductSku(product.sku || "");
    setEditedProductStatus(product.status as "Unlisted" | "Listed" | "Sold");
    setEditedProductPrice(product.purchasePrice);
    setEditedProductSalePrice(product.salePrice || 0);
    setEditedProductPlatform(product.platform || "");
    setEditedProductCategory(product.category || "");
    setEditedProductPurchaseDate(product.purchaseDate);
    setEditedProductSaleDate(product.saleDate || "");
    setEditedProductNotes(product.notes || "");
  };

  const handleUpdateProduct = async (e: React.FormEvent, productId: string) => {
    e.preventDefault();

    if (
      !editedProductName ||
      editedProductPrice <= 0 ||
      isNaN(editedProductPrice) ||
      isNaN(editedProductSalePrice)
    ) {
      return;
    }

    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const existingProducts = userSnapshot.data()?.products || [];

      const updatedProducts = existingProducts.map((product: Product) =>
        product.id === productId
          ? {
              ...product,
              name: editedProductName,
              size: editedProductSize,
              sku: editedProductSku,
              status: editedProductStatus,
              purchasePrice: editedProductPrice,
              salePrice: editedProductSalePrice,
              platform: editedProductPlatform,
              category: editedProductCategory,
              purchaseDate: editedProductPurchaseDate,
              saleDate: editedProductSaleDate,
              notes: editedProductNotes,
            }
          : product
      );

      await setDoc(userRef, {
        email: user.email,
        displayName: displayName,
        products: updatedProducts,
      });

      setProducts(updatedProducts);

      setEditingProductId(null);
      setEditedProductName("");
      setEditedProductSize("");
      setEditedProductSku("");
      setEditedProductStatus("Unlisted");
      setEditedProductPrice(0);
      setEditedProductSalePrice(0);
      setEditedProductPlatform("");
      setEditedProductCategory("");
      setEditedProductPurchaseDate("");
      setEditedProductSaleDate("");
      setEditedProductNotes("");
    }
  };

  const filteredProducts = products.filter((product) => {
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
                <button className="border bg-white duration-100 hover:cursor-pointer hover:bg-purple-50 hover:text-purple-500 border-gray-200 duration-1500 rounded-md p-6 py-1.5 text-center transition-all">
                  <AddIcon />
                </button>
              </div>
              <div className="flex">
                <select
                  name="status"
                  className={`border duration-100 hover:bg-purple-50 hover:text-purple-500 hover:cursor-pointer border-gray-200 duration-1500 h-10 rounded-md p-6 py-1.5 text-center transition-all ${
                    status
                      ? "bg-purple-100 text-purple-600"
                      : "bg-white text-slate-700"
                  }`}
                  placeholder="Status"
                  onChange={(event) => setStatus(event.target.value)}
                  defaultValue={"Status"}
                >
                  <option disabled value="Status">
                    Status
                  </option>
                  <option value="">All</option>
                  <option value="Unlisted">Unlisted</option>
                  <option value="Listed">Listed</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              <div>
                <select
                  name="platform"
                  className={`border duration-100 hover:bg-purple-50 hover:text-purple-500 hover:cursor-pointer border-gray-200 duration-1500 h-10 rounded-md p-6 py-1.5 text-center transition-all ${
                    platform
                      ? "bg-purple-100 text-purple-600"
                      : "bg-white text-slate-700"
                  }`}
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
                  className={`border duration-100 hover:bg-purple-50 hover:text-purple-500 hover:cursor-pointer border-gray-200 duration-1500 h-10 rounded-md p-6 py-1.5 text-center transition-all ${
                    category
                      ? "bg-purple-100 text-purple-600"
                      : "bg-white text-slate-700"
                  }`}
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

          {/* ADDPRODUCTFORM START */}

          <div className="w-[500px] mx-auto">
            {user && (
              <div>
                <form
                  className="flex mb-8 flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label htmlFor="name">Item Name</label>
                    <input
                      id="name"
                      {...register("name", {
                        required: "Item name is required",
                      })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="size">Size</label>
                    <input type="text" id="size" {...register("size")} />
                  </div>

                  <div>
                    <label htmlFor="sku">SKU</label>
                    <input type="text" id="sku" {...register("sku")} />
                  </div>

                  <div>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      {...register("status", {
                        required: "Status is required",
                      })}
                    >
                      <option value="Unlisted">Unlisted</option>
                      <option value="Listed">Listed</option>
                      <option value="Sold">Sold</option>
                    </select>
                    {errors.status && <span>{errors.status.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="purchasePrice">Purchase Price</label>
                    <input
                      step={0.01}
                      type="number"
                      id="purchasePrice"
                      {...register("purchasePrice", {
                        required: "Purchase price is required",
                        valueAsNumber: true,
                      })}
                    />
                    {errors.purchasePrice && (
                      <span>{errors.purchasePrice.message}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="salePrice">Sale Price</label>
                    <input
                      type="number"
                      id="salePrice"
                      {...register("salePrice", { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <label htmlFor="platform">Platform</label>
                    <select id="platform" {...register("platform")}>
                      <option value="">Select Platform</option>
                      <option value="StockX">StockX</option>
                      <option value="Goat">Goat</option>
                      <option value="Depop">Depop</option>
                      <option value="eBay">eBay</option>
                      <option value="OfferUp">OfferUp</option>
                      <option value="Mercari">Mercari</option>
                      <option value="Grailed">Grailed</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category">Category</label>
                    <select id="category" {...register("category")}>
                      <option value="">Select Category</option>
                      <option value="Sneaker">Sneaker</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Collectible">Collectible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="purchaseDate">Purchase Date</label>
                    <input
                      type="date"
                      id="purchaseDate"
                      {...register("purchaseDate", {
                        required: "Purchase date is required",
                      })}
                    />
                    {errors.purchaseDate && (
                      <span>{errors.purchaseDate.message}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="saleDate">Sale Date</label>
                    <input
                      type="date"
                      id="saleDate"
                      {...register("saleDate")}
                    />
                  </div>

                  <div>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      maxLength={32}
                      id="notes"
                      {...register("notes")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* ADDPRODUCTFORM END */}

          {/* TABLE */}
          <div className="mb-24 rounded-md mt-12 hidden overflow-x-auto xl:block">
            <table className="w-full overflow-x-auto truncate">
              <thead className="border-b-2">
                {/* TODO: Add Sort Functionality */}
                <tr className="text-left font-extrabold">
                  <th className="p-3 pr-64 text-slate-900 hover:bg-gray-100">
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
                  <th className="p-3 text-slate-900 hover:bg-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    className={`hover:bg-slate-200 ${
                      index % 2 === 0 ? "" : "bg-slate-100"
                    }`}
                    key={product.id}
                  >
                    <td className="max-w-[350px] truncate text-sm p-3 text-blue-500 hover:underline">
                      {editingProductId === product.id ? (
                        <input
                          className="w-full text-slate-700"
                          type="text"
                          value={editedProductName}
                          onChange={(e) => setEditedProductName(e.target.value)}
                        />
                      ) : (
                        <a
                          target="_blank"
                          href={`https://stockx.com/search?s=${product.name}`}
                        >
                          {product.name}
                        </a>
                      )}
                    </td>

                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <input
                          type="text"
                          value={editedProductSize}
                          onChange={(e) => setEditedProductSize(e.target.value)}
                        />
                      ) : (
                        product.size || ""
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <input
                          type="text"
                          value={editedProductSku}
                          onChange={(e) => setEditedProductSku(e.target.value)}
                        />
                      ) : (
                        product.sku || ""
                      )}
                    </td>

                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <select
                          value={editedProductStatus}
                          onChange={(e) =>
                            setEditedProductStatus(
                              e.target.value as "Unlisted" | "Listed" | "Sold"
                            )
                          }
                        >
                          <option value="Unlisted">Unlisted</option>
                          <option value="Listed">Listed</option>
                          <option value="Sold">Sold</option>
                        </select>
                      ) : (
                        <p>{product.status}</p>
                      )}
                    </td>

                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <input
                          type="number"
                          value={editedProductPrice}
                          onChange={(e) =>
                            setEditedProductPrice(parseFloat(e.target.value))
                          }
                        />
                      ) : (
                        product.purchasePrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <input
                          type="number"
                          value={editedProductSalePrice}
                          onChange={(e) =>
                            setEditedProductSalePrice(
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      ) : (
                        product.salePrice?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        }) || ""
                      )}
                    </td>

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

                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <select
                          value={editedProductPlatform}
                          onChange={(e) =>
                            setEditedProductPlatform(e.target.value)
                          }
                        >
                          <option value="">Select Platform</option>
                          <option value="StockX">StockX</option>
                          <option value="Goat">Goat</option>
                          <option value="Depop">Depop</option>
                          <option value="eBay">eBay</option>
                          <option value="OfferUp">OfferUp</option>
                          <option value="Mercari">Mercari</option>
                          <option value="Grailed">Grailed</option>
                        </select>
                      ) : (
                        product.platform || ""
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <select
                          value={editedProductCategory}
                          onChange={(e) =>
                            setEditedProductCategory(e.target.value)
                          }
                        >
                          <option value="">Select Category</option>
                          <option value="Sneaker">Sneaker</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Collectible">Collectible</option>
                        </select>
                      ) : (
                        product.category || ""
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <input
                          type="date"
                          value={editedProductPurchaseDate}
                          onChange={(e) =>
                            setEditedProductPurchaseDate(e.target.value)
                          }
                        />
                      ) : (
                        product.purchaseDate
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {editingProductId === product.id ? (
                        <input
                          type="date"
                          value={editedProductSaleDate}
                          onChange={(e) =>
                            setEditedProductSaleDate(e.target.value)
                          }
                        />
                      ) : (
                        product.saleDate || ""
                      )}
                    </td>
                    <td className="p-3 text-sm">{product.dateAdded}</td>
                    <td className="p-3 text-sm max-w-[400px] truncate">
                      {editingProductId === product.id ? (
                        <textarea
                          className="w-full"
                          value={editedProductNotes}
                          onChange={(e) =>
                            setEditedProductNotes(e.target.value)
                          }
                        />
                      ) : (
                        product.notes || ""
                      )}
                    </td>
                    <td className="flex justify-center items-center gap-3 p-2.5 ">
                      {editingProductId === product.id ? (
                        <form
                          className="flex gap-2"
                          onSubmit={(e) => handleUpdateProduct(e, product.id)}
                        >
                          <button type="submit">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-check-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProductId(null)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-x-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </button>
                        </form>
                      ) : (
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
                      )}

                      <div className="">
                        <button onClick={() => deleteProduct(product.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash3 mt-1"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW */}
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
                          {editingProductId === product.id ? (
                            <form
                              onSubmit={(e) =>
                                handleUpdateProduct(e, product.id)
                              }
                            >
                              <button type="submit">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-check-square mr-3"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingProductId(null)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-x-square"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                              </button>
                            </form>
                          ) : (
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
                          )}
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
                        <>
                          <p className="mt-4 font-bold">Size:</p> {product.size}
                        </>
                        <>
                          <p className="mt-4 font-bold">Platform:</p>
                          {product.platform}
                        </>
                        <p className="mt-4 font-bold">Purchase Price: </p>
                        {product.purchasePrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                      <div className="ml-auto">
                        <>
                          <p className="mt-4 font-bold">SKU:</p>
                          {product.sku}
                        </>
                        {product.saleDate && (
                          <>
                            <p className="mt-4 font-bold">Sale Date:</p>
                            {product.saleDate}
                          </>
                        )}
                        {product.salePrice && (
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
                        <p className="whitespace-break-spaces">
                          {product.notes}
                        </p>
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

                      {product.salePrice && (
                        <div className="ml-auto flex items-center rounded-md bg-gray-200 px-4 py-2">
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
