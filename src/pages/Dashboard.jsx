// src/pages/Dashboard.jsx
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">🎯 Dashboard</h1>
        <p className="text-green-400">👤 UID: {user?.uid}</p>
        <p className="text-blue-400">🔐 Role: {role}</p>

        <div className="mt-6 space-y-3">
          {/* Role-specific content */}
          {role === "admin" && (
            <>
              <h2 className="text-xl font-semibold">Admin Tools</h2>
              <ul className="list-disc list-inside ml-4">
                <li
                  onClick={() => navigate("/animals")}
                  className="cursor-pointer hover:underline"
                >
                  Manage Animals
                </li>
                <li
                  onClick={() => navigate("/users")}
                  className="cursor-pointer hover:underline"
                >
                  Manage Users
                </li>
              </ul>
            </>
          )}

          {role === "zookeeper" && (
            <>
              <h2 className="text-xl font-semibold">Zookeeper Tools</h2>
              <p
                onClick={() => navigate("/feeding")}
                className="cursor-pointer hover:underline"
              >
                Update Feeding Logs
              </p>
            </>
          )}

          {role === "vet" && (
            <>
              <h2 className="text-xl font-semibold">Vet Tools</h2>
              <p
                onClick={() => navigate("/medical")}
                className="cursor-pointer hover:underline"
              >
                View/Add Medical Records
              </p>
            </>
          )}

          {role === "researcher" && (
            <>
              <h2 className="text-xl font-semibold">Researcher View</h2>
              <p>🔍 You can view habitat and animal data (read-only)</p>
            </>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
