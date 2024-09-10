import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "flipassist - Elevate Your Reselling Game",
  description:
    "Advanced tools, inventory tracking, and more for resellers. Explore our features and enhance your reselling experience.",
  metadataBase: new URL("https://www.flipassist.app"),
  openGraph: {
    title: "flipassist - Elevate Your Reselling Game",
    description:
      "Advanced tools, inventory tracking, and more for resellers. Explore our features and enhance your reselling experience.",
    url: "https://www.flipassist.app",
    siteName: "flipassist",
    images: [
      {
        url: "https://www.flipassist.app/api/og",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "flipassist - Elevate Your Reselling Game",
    description:
      "Advanced tools, inventory tracking, and more for resellers. Explore our features and enhance your reselling experience.",
    images: ["https://www.flipassist.app/api/og"],
  },
  alternates: {
    canonical: "https://www.flipassist.app",
  },
  icons: [
    {
      url: "/favicon.ico",
      href: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 bg-slate-50 top-full text-slate-700">
        {children}
      </body>
    </html>
  );
}
