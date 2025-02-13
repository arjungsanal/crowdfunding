'use client'; // Add this directive to make it a Client Component

import ProtectedRoute from '@/components/protectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1>Dashboard</h1>
        <p>Welcome {user?.email}</p>
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    </ProtectedRoute>
  );
}