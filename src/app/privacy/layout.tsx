import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | flipassist",
  description:
    "Learn about our commitment to protecting your data and privacy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
