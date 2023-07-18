import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitors | flipassist",
  description:
    "Stay up-to-date with real-time Twitter monitoring on our dedicated page. Seamlessly add or remove monitor pages to customize your monitoring experience according to your interests.",
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
