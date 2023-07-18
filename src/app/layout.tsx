import Footer from "./components/Footer";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "flipassist",
  description:
    "Elevate your reselling game with advanced tools, inventory tracking, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 min-h-[100vh] top-full text-slate-700">
        {children}
      </body>
    </html>
  );
}
