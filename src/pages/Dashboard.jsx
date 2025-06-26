import React from "react";
// src/pages/Dashboard.jsx

import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user, role, loading,logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-zinc-900">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>👤 UID: <span className="text-green-400">{user?.uid}</span></p>
      <p>🔐 Role: <span className="text-green-400">{role ?? "none"}</span></p>
      <button
        onClick={logout}
        className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
