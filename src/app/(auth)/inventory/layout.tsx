import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory | flipassist",
  description:
    "Efficiently manage your products with our user-friendly inventory page. Keep track of essential details such as product name, size, SKU, and purchase price, ensuring easy organization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="min-h-[100vh]">
        {children}
        <div className="sticky top-full md:ml-[250px]">
          <Footer />
        </div>
      </div>
    </section>
  );
}
