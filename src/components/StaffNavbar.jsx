// src/components/StaffNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function StaffNavbar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      admin: "Administrator",
      zookeeper: "Zookeeper",
      vet: "Veterinarian",
      researcher: "Researcher"
    };
    return roleMap[role] || role;
  };

  const getRoleIcon = (role) => {
    const iconMap = {
      admin: "fas fa-crown",
      zookeeper: "fas fa-paw",
      vet: "fas fa-stethoscope",
      researcher: "fas fa-microscope"
    };
    return iconMap[role] || "fas fa-user";
  };

  const getNavLinks = () => {
    const links = [];
    if (role === "admin") {
      links.push({ to: "/dashboard", label: "Dashboard", icon: "fas fa-chart-pie" });
    }
    if (role === "zookeeper") {
      links.push({ to: "/feeding", label: "Feeding", icon: "fas fa-utensils" });
    }
    if (role === "vet") {
      links.push({ to: "/medical", label: "Medical", icon: "fas fa-heartbeat" });
    }
    if (role === "researcher") {
      links.push({ to: "/dashboard", label: "Research", icon: "fas fa-flask" });
    }
    return links;
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white shadow-lg border-b-2 border-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <i className="fas fa-elephant text-white text-lg"></i>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                ZooKeeper Hub
              </h1>
              <p className="text-xs text-slate-300 hidden sm:block">Wildlife Management System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-center space-x-1">
              {getNavLinks().map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="group flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-600 hover:text-emerald-300 hover:shadow-md hover:scale-105"
                >
                  <i className={`${link.icon} mr-2 text-sm group-hover:scale-110 transition-transform`}></i>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* User Info & Logout */}
            <div className="flex items-center ml-6 pl-6 border-l border-slate-600">
              <div className="flex items-center mr-4">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center mr-2">
                  <i className={`${getRoleIcon(role)} text-emerald-400 text-sm`}></i>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-slate-200">{getRoleDisplayName(role)}</p>
                  <p className="text-xs text-slate-400">Online</p>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="group flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                <i className="fas fa-sign-out-alt mr-2 group-hover:rotate-12 transition-transform"></i>
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-2 border-t border-slate-600">
            {/* User Info Mobile */}
            <div className="flex items-center px-4 py-3 bg-slate-700 rounded-lg mb-3">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center mr-3">
                <i className={`${getRoleIcon(role)} text-emerald-400`}></i>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">{getRoleDisplayName(role)}</p>
                <p className="text-xs text-slate-400">Online</p>
              </div>
            </div>

            {/* Navigation Links Mobile */}
            {getNavLinks().map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <i className={`${link.icon} mr-3 text-emerald-400 w-5`}></i>
                {link.label}
              </Link>
            ))}

            {/* Logout Mobile */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors mt-4"
            >
              <i className="fas fa-sign-out-alt mr-3 w-5"></i>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}