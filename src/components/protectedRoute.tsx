"use client"; // Ensure this is a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter(); // Use the correct router

  useEffect(() => {
    if (!user) {
      router.push('/auth'); // Redirect to the auth page if the user is not authenticated
    }
  }, [user, router]);

  return user ? <>{children}</> : null; // Render children only if the user is authenticated
}