import type { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

function AuthShowcase() {
  const products = api.products.listofproducts.useQuery();

  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  console.warn(sessionData);

  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { register, handleSubmit, setValue } = useForm<Product>();

  const createProduct = api.products.create.useMutation();

  const onSubmit = (formData: Product) => {
    const currentDate = new Date();
    formData.dateAdded = currentDate;
    createProduct.mutateAsync(formData);
    console.log(formData);
  };

  return (
    <div>
      {/* ADD ITEM FORM */}
      <div className="flex justify-center">
        <div className="flex w-[500px] flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl">Add an Item</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="dark: mb-2 block text-sm font-medium text-gray-900"
              >
                Item Name
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="dark: mb-2 block text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("purchasePrice", {
                  required: true,
                  setValueAs: (value) => parseFloat(value), // Parse the value as a float
                })}
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="dark: mb-2 block text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                id="status"
                className="duration-1500 rounded-md border border-black bg-gray-200 p-6 py-1.5 text-center transition-all hover:bg-white hover:text-black"
                {...register("status", { required: true })}
                onChange={(e) =>
                  setValue(
                    "status",
                    e.target.value as "All" | "Listed" | "Sold",
                    { shouldValidate: true }
                  )
                }
              >
                <option disabled value="">
                  Select Status
                </option>
                <option value="Listed">Listed</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="purchaseDate"
                className="dark: mb-2 block text-sm font-medium text-gray-900"
              >
                Purchase Date
              </label>
              <input
                id="purchaseDate"
                type="date"
                className="dark: block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("purchaseDate", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </form>
        </div>
      </div>

      <div className="h-[550px] bg-gray-500 px-12 py-5 text-white">
        <p className="text-xl">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>

        {hello.data ? hello.data.greeting : "Loading tRPC query..."}

        {products?.data?.map((product) => (
          <div
            key={product.id}
            className="mt-12 h-64 w-96 rounded-lg bg-blue-800 px-12 py-5 text-white"
          >
            <h1 className="text-center text-2xl font-bold">{product.name}</h1>
            <p>Status: {product.status}</p>
            <p>Purchase Price: {product.purchasePrice}</p>
            <p>Purchase Date: {product.purchaseDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthShowcase;
