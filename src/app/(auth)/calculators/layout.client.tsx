"use client";

import AuthGuard from "@/app/components/AuthGuard";

export default function CalculatorsLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
} 