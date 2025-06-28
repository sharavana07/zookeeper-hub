// src/components/StaffNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function StaffNavbar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-800 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">ZooKeeper Hub</h1>
        <nav className="space-x-4">
          {role === "admin" && <Link to="/dashboard">Dashboard</Link>}
          {role === "zookeeper" && <Link to="/feeding">Feeding</Link>}
          {role === "vet" && <Link to="/medical">Medical</Link>}
          {role === "researcher" && <Link to="/dashboard">Research</Link>}
          <button onClick={handleLogout} className="ml-4 bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">
            <i className="fas fa-sign-out-alt mr-2"></i>
            Log Out
          </button>
        </nav>
      </div>
    </header>
  );
}
