import DashboardLayoutClient from "./layout.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | flipassist",
  description:
    "Get a comprehensive overview of your inventory's statistics, including a detailed chart and recent activity updates. Stay on top of your business with our all-in-one dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </section>
  );
}
