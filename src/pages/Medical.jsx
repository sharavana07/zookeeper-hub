// src/pages/Medical.jsx
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Medical() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();           // this clears Firebase session
    navigate("/login");       // redirect to login page
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">🩺 Medical Records</h1>

      <p className="mb-2">👤 UID: {user?.uid}</p>
      <p className="mb-6">🔐 Role: {role}</p>

      {/* Your vet features go here */}

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
