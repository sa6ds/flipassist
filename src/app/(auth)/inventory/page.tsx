"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "@/app/components/Header";
import AddIcon from "@mui/icons-material/Add";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { User } from "@firebase/auth";
import AddModal from "@/app/components/inventoryComponents/AddModal";
import Table from "@/app/components/inventoryComponents/Table";
import MobileTable from "@/app/components/inventoryComponents/MobileTable";
import { updateUserDocument } from "../../utils/firestoreUtils";
import { DateUtils } from "@/app/utils/dateUtils";
import { Product, ProductCategory } from "@/app/types";

export default function Inventory() {
  const [searchWord, setSearchWord] = useState("");
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editProductModalVisible, setEditProductModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteSelectedModalVisible, setDeleteSelectedModalVisible] =
    useState(false);

  const toggleEditProductModal = () => {
    setEditProductModalVisible(!editProductModalVisible);
  };

  const toggleModal = () => {
    setAddModalVisible((prevState) => !prevState);
  };

  const toggleDeleteModal = (productId: string | null) => {
    setProductToDelete(productId);
    setDeleteModalVisible((prevState) => !prevState);
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      setSelectedProducts([]);
      setSelectAll(false);
    }
    setIsEditMode((prevState) => !prevState);
  };

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
  const [editedProductSalePrice, setEditedProductSalePrice] = useState<
    number | null
  >(null);
  const [editedProductPlatform, setEditedProductPlatform] =
    useState<string>("");
  const [editedProductCategory, setEditedProductCategory] =
    useState<ProductCategory>(null);
  const [editedProductPurchaseDate, setEditedProductPurchaseDate] =
    useState<string>("");
  const [editedProductSaleDate, setEditedProductSaleDate] =
    useState<string>("");
  const [editedProductNotes, setEditedProductNotes] = useState<string>("");
  const [editedProductDateAdded, setEditedProductDateAdded] =
    useState<string>("");

  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const fetchProducts = useCallback(async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
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
    if (!user) return;
    try {
      if (data.salePrice && data.status !== "Sold") {
        data.status = "Sold";
      }

      const newProduct: Product = {
        id: uuidv4(),
        name: data.name,
        size: data.size,
        sku: data.sku,
        status: data.status,
        purchasePrice: data.purchasePrice,
        salePrice: data.salePrice ? Number(data.salePrice) : null,
        platform: data.platform || null,
        category: (data.category as ProductCategory) || null,
        purchaseDate: DateUtils.parseAndFormatDate(data.purchaseDate),
        saleDate: data.saleDate
          ? DateUtils.parseAndFormatDate(data.saleDate)
          : null,
        dateAdded: DateUtils.formatDate(new Date()),
        notes: data.notes || null,
      };

      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const existingProducts = userSnapshot.data()?.products || [];

      const updatedProducts = [...existingProducts, newProduct];

      await updateUserDocument(user.uid, {
        products: updatedProducts,
      });

      setProducts(updatedProducts);
      setAddModalVisible(false);
      reset();
    } catch (error) {
      console.error(error);
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

  const deleteProduct = async () => {
    if (!user || !productToDelete) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const existingProducts = userSnapshot.data()?.products || [];

      const updatedProducts = existingProducts.filter(
        (product: Product) => product.id !== productToDelete
      );

      await updateUserDocument(user.uid, {
        products: updatedProducts,
      });

      setProducts(updatedProducts);
      setIsEditMode(false);
      toggleDeleteModal(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEditing = (product: Product) => {
    setEditingProductId(product.id);
    setEditedProductName(product.name || "");
    setEditedProductSize(product.size || "");
    setEditedProductSku(product.sku || "");
    setEditedProductStatus(product.status as "Unlisted" | "Listed" | "Sold");
    setEditedProductPrice(product.purchasePrice);
    setEditedProductSalePrice(product.salePrice || null);
    setEditedProductPlatform(product.platform || "");
    setEditedProductCategory(product.category || null);
    setEditedProductPurchaseDate(
      DateUtils.parseAndFormatDate(product.purchaseDate)
    );
    setEditedProductSaleDate(
      product.saleDate ? DateUtils.parseAndFormatDate(product.saleDate) : ""
    );
    setEditedProductNotes(product.notes || "");
    setEditedProductDateAdded(DateUtils.parseAndFormatDate(product.dateAdded));
    toggleEditProductModal();
  };

  const handleUpdateProduct = async (e: React.FormEvent, productId: string) => {
    e.preventDefault();

    if (
      !editedProductName ||
      editedProductPrice < 0 ||
      isNaN(editedProductPrice)
    ) {
      return alert("Please fill out all required fields");
    }

    if (!user) return;
    try {
      if (editedProductSalePrice && editedProductStatus !== "Sold") {
        setEditedProductStatus("Sold");
      }

      const updatedProduct: Product = {
        id: productId,
        name: editedProductName,
        size: editedProductSize,
        sku: editedProductSku,
        status: editedProductStatus,
        purchasePrice: editedProductPrice,
        salePrice:
          editedProductSalePrice === null ? null : editedProductSalePrice,
        platform: editedProductPlatform,
        category: editedProductCategory,
        purchaseDate: DateUtils.parseAndFormatDate(editedProductPurchaseDate),
        saleDate: editedProductSaleDate
          ? DateUtils.parseAndFormatDate(editedProductSaleDate)
          : null,
        dateAdded: DateUtils.parseAndFormatDate(editedProductDateAdded),
        notes: editedProductNotes,
      };

      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const existingProducts = userSnapshot.data()?.products || [];

      const updatedProducts = existingProducts.map((product: Product) =>
        product.id === productId ? updatedProduct : product
      );

      await updateUserDocument(user.uid, {
        products: updatedProducts,
      });

      setProducts(updatedProducts);
      resetEditingState();
      toggleEditProductModal();
    } catch (error) {
      console.error(error);
    }
  };

  const resetEditingState = () => {
    setEditingProductId(null);
    setEditedProductName("");
    setEditedProductSize("");
    setEditedProductSku("");
    setEditedProductStatus("Unlisted");
    setEditedProductPrice(0);
    setEditedProductSalePrice(null);
    setEditedProductPlatform("");
    setEditedProductCategory(null);
    setEditedProductPurchaseDate("");
    setEditedProductSaleDate("");
    setEditedProductNotes("");
    setEditedProductDateAdded("");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(searchWord.toLowerCase());

      const statusMatch = status === "" || product.status === status;
      const platformMatch = platform === "" || product.platform === platform;
      const categoryMatch = category === "" || product.category === category;

      return nameMatch && statusMatch && platformMatch && categoryMatch;
    });
  }, [products, searchWord, status, platform, category]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const toggleDeleteSelectedModal = () => {
    setDeleteSelectedModalVisible((prevState) => !prevState);
  };

  const handleDeleteSelectedProducts = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const existingProducts = userSnapshot.data()?.products || [];

      const updatedProducts = existingProducts.filter(
        (product: Product) => !selectedProducts.includes(product.id)
      );

      await updateUserDocument(user.uid, {
        products: updatedProducts,
      });

      setProducts(updatedProducts);
      setSelectedProducts([]);
      setIsEditMode(false);
      toggleDeleteSelectedModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEditedProductCategory(value === "" ? null : (value as ProductCategory));
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-0 truncate md:ml-[250px]">
        <Header pageTitle="Inventory" />

        <div className="mx-8 my-8">
          {/* BOOKMARK 1 FILTERS */}
          <div className="xl:flex xl:items-center xl:gap-5">
            <input
              type="text"
              placeholder="Search"
              onChange={(event) => {
                setSearchWord(event.target.value);
              }}
              name="search"
              className="border px-5 py-1.5 xl:w-4/12 border-gray-200 w-full rounded-lg flex"
            ></input>

            <div className="ml-auto mt-4 flex flex-wrap gap-3 xl:mt-0 xl:flex-nowrap">
              <div className="gap-3 flex">
                <button
                  onClick={toggleModal}
                  className="border bg-white duration-100 hover:cursor-pointer hover:bg-purple-50 hover:text-purple-500 border-gray-200 duration-1500 rounded-md px-3 py-1.5 text-center transition-all"
                >
                  <AddIcon />
                </button>
                {isEditMode && selectedProducts.length > 0 && (
                  <button
                    onClick={toggleDeleteSelectedModal}
                    className="border bg-red-500 text-white duration-100 hover:cursor-pointer hover:bg-red-600 border-gray-200 duration-1500 rounded-md px-3 py-1.5 text-center transition-all"
                  >
                    Delete Selected
                  </button>
                )}
                {isEditMode && (
                  <button
                    onClick={handleSelectAll}
                    className="border bg-purple-500 text-white duration-100 hover:cursor-pointer hover:bg-purple-600 border-gray-200 duration-1500 rounded-md px-3 py-1.5 text-center transition-all "
                  >
                    {selectAll ? "Deselect All" : "Select All"}
                  </button>
                )}
                <button
                  onClick={toggleEditMode}
                  className="border bg-green-500 text-white duration-100 hover:cursor-pointer hover:bg-green-600 border-gray-200 duration-1500 rounded-md px-3 py-1.5 text-center transition-all"
                >
                  {isEditMode ? "Done" : "Edit"}
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

          {/* BOOKMARK 2 ADD PRODUCT MODAL */}
          <AddModal
            isVisible={addModalVisible}
            toggleModal={toggleModal}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
          />

          {/* BOOKMARK 3 EDIT PRODUCT MODAL */}
          {editProductModalVisible && editingProductId && (
            <div
              id="authentication-modal"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex justify-center items-center bg-black bg-opacity-50"
            >
              <div className="relative mx-4 md:mx-14  w-full sm:w-[500px] bg-white rounded-lg shadow ">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  onClick={() => {
                    setEditingProductId(null);
                    toggleEditProductModal();
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 ">
                  <h3 className="mb-4 text-xl font-medium text-gray-900">
                    Edit {products.find((p) => p.id === editingProductId)?.name}
                  </h3>
                  <form
                    className="space-y-6"
                    onSubmit={(e) => handleUpdateProduct(e, editingProductId)}
                  >
                    {/* Product Name */}
                    <div className="mb-4">
                      <div className="my-0">
                        <label
                          htmlFor="name"
                          className="block text-sm mb-2 font-medium text-gray-900 "
                        >
                          Product Name
                        </label>
                      </div>

                      <input
                        value={editedProductName}
                        onChange={(e) => setEditedProductName(e.target.value)}
                        className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                      />
                    </div>

                    <div className="flex justify-between">
                      {/* Size */}
                      <div className="mb-4">
                        <label
                          htmlFor="size"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Size
                        </label>
                        <input
                          type="text"
                          value={editedProductSize}
                          onChange={(e) => setEditedProductSize(e.target.value)}
                          className="p-2 sm:w-32 w-24  text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* SKU */}
                      <div className="mb-4">
                        <label
                          htmlFor="sku"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          SKU
                        </label>
                        <input
                          type="text"
                          value={editedProductSku}
                          onChange={(e) => setEditedProductSku(e.target.value)}
                          className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Status */}
                      <div className="mb-4">
                        <div className="flex gap-2">
                          <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Status
                          </label>
                        </div>
                        <select
                          value={editedProductStatus}
                          onChange={(e) =>
                            setEditedProductStatus(
                              e.target.value as "Unlisted" | "Listed" | "Sold"
                            )
                          }
                          className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Unlisted">Unlisted</option>
                          <option value="Listed">Listed</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      {/* Purchase Price */}
                      <div className="mb-4">
                        <div>
                          <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Purchase Price
                          </label>
                        </div>
                        <input
                          step={0.01}
                          type="number"
                          value={editedProductPrice}
                          onChange={(e) =>
                            setEditedProductPrice(parseFloat(e.target.value))
                          }
                          className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      {/* Sale Price */}
                      <div className="mb-4">
                        <label
                          htmlFor="salePrice"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Sale Price
                        </label>
                        <input
                          type="number"
                          value={editedProductSalePrice ?? ""}
                          onChange={(e) =>
                            setEditedProductSalePrice(
                              e.target.value === ""
                                ? null
                                : parseFloat(e.target.value)
                            )
                          }
                          className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Platform */}
                      <div className="mb-4">
                        <label
                          htmlFor="platform"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Platform
                        </label>
                        <select
                          value={editedProductPlatform}
                          onChange={(e) =>
                            setEditedProductPlatform(e.target.value)
                          }
                          className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                      </div>
                    </div>

                    <div className="flex gap-3 justify-between">
                      {/* Category */}
                      <div className="mb-4">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Category
                        </label>
                        <select
                          value={editedProductCategory ?? ""}
                          onChange={handleCategoryChange}
                          className="sm:w-32 w-24 p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Category</option>
                          <option value="Sneaker">Sneaker</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Collectible">Collectible</option>
                        </select>
                      </div>

                      {/* Purchase Date */}
                      <div className="mb-4">
                        <div className="flex gap-2">
                          <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Purchase Date
                          </label>
                        </div>
                        <input
                          type="date"
                          value={editedProductPurchaseDate}
                          onChange={(e) =>
                            setEditedProductPurchaseDate(e.target.value)
                          }
                          className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Sale Date */}
                      <div className="mb-4">
                        <label
                          htmlFor="saleDate"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Sale Date
                        </label>
                        <input
                          type="date"
                          value={editedProductSaleDate}
                          onChange={(e) =>
                            setEditedProductSaleDate(e.target.value)
                          }
                          className="sm:w-32 w-24  p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                      <label
                        htmlFor="notes"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Notes
                      </label>
                      <textarea
                        maxLength={32}
                        value={editedProductNotes}
                        onChange={(e) => setEditedProductNotes(e.target.value)}
                        className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full duration-1500 rounded-lg bg-green-500 hover:bg-green-600 border border-green-600 py-1.5 text-center text-white transition-all"
                    >
                      Edit Product
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* BOOKMARK 4 TABLE */}
          <Table
            filteredProducts={filteredProducts}
            handleStartEditing={handleStartEditing}
            deleteProduct={async (productId) => {
              toggleDeleteModal(productId);
              return Promise.resolve();
            }}
            handleSelectProduct={handleSelectProduct}
            selectedProducts={selectedProducts}
            isEditMode={isEditMode}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
          />

          {/* BOOKMARK 5 MOBILE TABLE */}
          <MobileTable
            filteredProducts={filteredProducts}
            deleteProduct={(productId) => toggleDeleteModal(productId)}
            handleStartEditing={handleStartEditing}
            handleUpdateProduct={handleUpdateProduct}
            editingProductId={editingProductId}
            setEditingProductId={setEditingProductId}
            handleSelectProduct={handleSelectProduct}
            selectedProducts={selectedProducts}
            isEditMode={isEditMode}
          />
        </div>
      </div>
      <div className="sticky top-full md:ml-[250px]">
        <Footer />
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalVisible && productToDelete && (
        <div
          id="delete-confirmation-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex justify-center items-center bg-black bg-opacity-30"
        >
          <div className="relative mx-4 md:mx-14 w-full sm:w-[500px] bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              onClick={() => toggleDeleteModal(null)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6">
              <h3 className="mb-4 text-xl text-gray-900">
                Are you sure you want to delete this product?
              </h3>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() => toggleDeleteModal(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  onClick={deleteProduct}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE SELECTED CONFIRMATION MODAL */}
      {deleteSelectedModalVisible && (
        <div
          id="delete-selected-confirmation-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex justify-center items-center bg-black bg-opacity-30"
        >
          <div className="relative mx-4 md:mx-14 w-full sm:w-[500px] bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              onClick={toggleDeleteSelectedModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6">
              {selectedProducts.length === 1 ? (
                <h3 className="mb-4 text-xl text-gray-900">
                  Are you sure you want to delete{" "}
                  {products.find((p) => p.id === selectedProducts[0])?.name}?
                </h3>
              ) : (
                <>
                  <h3 className="mb-4 text-xl text-gray-900">
                    Are you sure you want to delete the following items?
                  </h3>
                  <ul className="mb-4 list-disc list-inside text-gray-900">
                    {selectedProducts.map((productId) => {
                      const product = products.find((p) => p.id === productId);
                      return <li key={productId}>{product?.name}</li>;
                    })}
                  </ul>
                </>
              )}
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={toggleDeleteSelectedModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  onClick={handleDeleteSelectedProducts}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
