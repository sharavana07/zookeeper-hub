// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-zinc-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col items-center space-y-1">
        <h1 className="text-xl font-bold">🐾 ZooKeeper Hub</h1>
        <div className="text-sm">
          <span className="mr-4">UID: {user?.uid}</span>
          <span className="mr-4">Role: {role}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
