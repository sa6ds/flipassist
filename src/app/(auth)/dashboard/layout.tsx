import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | flipassist",
  description:
    "Get a comprehensive overview of your inventory's statistics, including a detailed chart and recent activity updates. Stay on top of your business with our all-in-one dashboard.",
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
