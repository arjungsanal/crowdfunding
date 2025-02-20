"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, redirectPath = "/auth" }: { children: React.ReactNode; redirectPath?: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectPath);
    }
  }, [user, loading, router, redirectPath]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator instead of redirecting
  }

  return user ? <>{children}</> : null;
}
