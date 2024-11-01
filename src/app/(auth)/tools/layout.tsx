import ToolsLayoutClient from "./layout.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools | flipassist",
  description:
    "Access a suite of advanced tools to enhance your reselling experience.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ToolsLayoutClient>{children}</ToolsLayoutClient>
    </section>
  );
}
