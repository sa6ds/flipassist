import MonitorsLayoutClient from "./layout.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitors | flipassist",
  description:
    "Stay up-to-date with real-time Twitter monitoring on our dedicated page. Seamlessly add or remove monitor pages to customize your monitoring experience according to your interests.",
};

export default function MonitorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <MonitorsLayoutClient>{children}</MonitorsLayoutClient>
    </section>
  );
}
