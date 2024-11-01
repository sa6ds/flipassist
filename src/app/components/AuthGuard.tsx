"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../utils/useUser";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user === null) {
      router.replace("/");
    }
  }, [router, user]);

  // Show nothing while loading
  if (user === false) {
    return null;
  }

  // Show nothing if not authenticated
  if (user === null) {
    return null;
  }

  // Show children if authenticated
  return <>{children}</>;
} 