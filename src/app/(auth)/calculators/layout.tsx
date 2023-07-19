import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculators | flipassist",
  description:
    "Calculate fees for popular selling platforms like StockX, GOAT, Grailed, and more. Optimize your profits with our fee calculators for hassle-free selling.",
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
