"use client";

import AuthGuard from "@/app/components/AuthGuard";

export default function InventoryLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
} 