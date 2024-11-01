import SettingsLayoutClient from "./layout.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | flipassist",
  description: "Manage your account settings and preferences.",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayoutClient>{children}</SettingsLayoutClient>;
}
