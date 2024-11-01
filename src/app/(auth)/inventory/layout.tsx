import InventoryLayoutClient from "./layout.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory | flipassist",
  description:
    "Efficiently manage your products with our user-friendly inventory page. Keep track of essential details such as product name, size, SKU, and purchase price, ensuring easy organization.",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <InventoryLayoutClient>{children}</InventoryLayoutClient>
    </section>
  );
}
