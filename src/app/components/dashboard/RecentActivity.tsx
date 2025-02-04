import { Product } from "@/app/types";
import Image from "next/image";
import sneakerIcon from "@/app/assets/icons/recentActivity/shoe.svg";
import clothingIcon from "@/app/assets/icons/recentActivity/clothing.svg";
import packageIcon from "@/app/assets/icons/recentActivity/product.svg";
import collectibleIcon from "@/app/assets/icons/recentActivity/collectable.svg";

interface RecentActivityProps {
  products: Product[];
}

export const RecentActivity = ({ products }: RecentActivityProps) => (
  <div className="h-[500px] w-full rounded-md py-2 shadow-md bg-white xl:ml-auto xl:h-auto xl:w-4/12">
    <h2 className="mx-8 my-5 text-2xl text-slate-900 font-bold">
      Recent Activity
    </h2>
    <div className="mx-8 text-xl">
      {products.slice(0, 7).map((product, index) => (
        <div key={index} className="my-8">
          <div className="mt-1 flex">
            {product.category === "Sneaker" ? (
              <Image
                src={sneakerIcon}
                alt="Shoe Icon"
                className="not-highlightable w-6"
              />
            ) : product.category === "Clothing" ? (
              <Image
                src={clothingIcon}
                alt="Shirt Icon"
                className="not-highlightable w-6"
              />
            ) : product.category === "Collectible" ? (
              <Image
                src={collectibleIcon}
                alt="Collectible Icon"
                className="not-highlightable w-6"
              />
            ) : (
              <Image
                src={packageIcon}
                alt="Package Icon"
                className="not-highlightable w-6"
              />
            )}
            <p className="ml-4 max-w-[50%] truncate">{product.name}</p>
            <p className="ml-auto">{product.dateAdded}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
