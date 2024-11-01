"use client";

import AuthGuard from "@/app/components/AuthGuard";

export default function ToolsLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
} 