// src/pages/UsersPage.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("email");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const userList = snap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (uid, newRole) => {
    try {
      await updateDoc(doc(db, "users", uid), { role: newRole });
      setUsers(users.map(u => 
        u.id === uid ? { ...u, role: newRole } : u
      ));
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDelete = async (uid) => {
    // Prevent users from deleting themselves
    if (uid === currentUser?.uid) {
      alert("You cannot delete your own account!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", uid));
        setUsers(users.filter(u => u.id !== uid));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortBy === "email") return a.email?.localeCompare(b.email) || 0;
      if (sortBy === "role") return a.role?.localeCompare(b.role) || 0;
      return 0;
    });

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin": return "👑";
      case "zookeeper": return "🦁";
      case "vet": return "🩺";
      case "researcher": return "🔬";
      default: return "👤";
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin": return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-400/30";
      case "zookeeper": return "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 border-emerald-400/30";
      case "vet": return "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 border-cyan-400/30";
      case "researcher": return "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-200 border-orange-400/30";
      default: return "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-200 border-gray-400/30";
    }
  };

  const getStatsForRole = (role) => {
    return users.filter(user => user.role === role).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-emerald-400/30 border-t-emerald-400 mx-auto mb-6"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-400/5 blur-xl"></div>
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">Loading ZooKeeper Hub</h2>
                <p className="text-emerald-200 text-lg">Gathering user data...</p>
                <div className="mt-4 flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/25">
                👥
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  User Management
                </h1>
                <p className="text-emerald-200/80 text-xl mt-1">Manage your ZooKeeper Hub team</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  👑
                </div>
                <div>
                  <p className="text-white/60 text-sm">Admins</p>
                  <p className="text-white text-2xl font-bold">{getStatsForRole('admin')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                  🦁
                </div>
                <div>
                  <p className="text-white/60 text-sm">Zookeepers</p>
                  <p className="text-white text-2xl font-bold">{getStatsForRole('zookeeper')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  🩺
                </div>
                <div>
                  <p className="text-white/60 text-sm">Vets</p>
                  <p className="text-white text-2xl font-bold">{getStatsForRole('vet')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                  🔬
                </div>
                <div>
                  <p className="text-white/60 text-sm">Researchers</p>
                  <p className="text-white text-2xl font-bold">{getStatsForRole('researcher')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🔍</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Search team members by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 focus:bg-white/15 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-teal-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Role Filter */}
              <div className="w-full lg:w-auto">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full lg:w-56 px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-800">🌟 All Roles</option>
                  <option value="admin" className="bg-slate-800">👑 Admin</option>
                  <option value="zookeeper" className="bg-slate-800">🦁 Zookeeper</option>
                  <option value="vet" className="bg-slate-800">🩺 Vet</option>
                  <option value="researcher" className="bg-slate-800">🔬 Researcher</option>
                </select>
              </div>

              {/* Sort */}
              <div className="w-full lg:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full lg:w-48 px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="email" className="bg-slate-800">📧 Sort by Email</option>
                  <option value="role" className="bg-slate-800">🎭 Sort by Role</option>
                </select>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-white/70">Total Users:</span>
                  <span className="text-white font-bold text-lg">{users.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span className="text-white/70">Filtered Results:</span>
                  <span className="text-white font-bold text-lg">{filteredUsers.length}</span>
                </div>
                {searchTerm && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-white/70">Search:</span>
                    <span className="text-cyan-200 font-medium">"{searchTerm}"</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Users Grid */}
          {filteredUsers.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 max-w-md mx-auto border border-white/20">
                <div className="text-8xl mb-6 opacity-50">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4">No team members found</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  {searchTerm || roleFilter !== "all" 
                    ? "Try adjusting your search criteria or filters to find the team members you're looking for"
                    : "No users are currently registered in the system"
                  }
                </p>
                {(searchTerm || roleFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setRoleFilter("all");
                    }}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredUsers.map(userItem => (
                <div 
                  key={userItem.id} 
                  className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02]"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Enhanced User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/25">
                            {userItem.email?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full flex items-center justify-center text-xs">
                            {getRoleIcon(userItem.role)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-white text-xl font-bold flex items-center gap-2">
                              {userItem.email}
                            </p>
                            {userItem.id === currentUser?.uid && (
                              <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 text-sm rounded-full border border-emerald-400/30 font-medium">
                                ✨ You
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-4 py-2 rounded-xl text-sm font-medium border backdrop-blur-md ${getRoleBadgeColor(userItem.role)}`}>
                              {getRoleIcon(userItem.role)} {userItem.role || "researcher"}
                            </span>
                            <span className="text-white/50 text-sm">
                              User ID: {userItem.id.slice(0, 8)}...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:w-auto">
                      {/* Role Selector */}
                      <div className="relative">
                        <select
                          value={userItem.role || "researcher"}
                          onChange={(e) => handleRoleChange(userItem.id, e.target.value)}
                          disabled={userItem.id === currentUser?.uid}
                          className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 appearance-none cursor-pointer min-w-[160px] ${
                            userItem.id === currentUser?.uid
                              ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                              : "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                          }`}
                        >
                          <option value="admin" className="bg-slate-800">👑 Admin</option>
                          <option value="zookeeper" className="bg-slate-800">🦁 Zookeeper</option>
                          <option value="vet" className="bg-slate-800">🩺 Vet</option>
                          <option value="researcher" className="bg-slate-800">🔬 Researcher</option>
                        </select>
                        {userItem.id === currentUser?.uid && (
                          <div className="absolute top-full mt-1 left-0 right-0 text-xs text-white/50 text-center">
                            Can't change own role
                          </div>
                        )}
                      </div>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(userItem.id)}
                        disabled={userItem.id === currentUser?.uid}
                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px] ${
                          userItem.id === currentUser?.uid
                            ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
                            : "bg-red-500/20 border border-red-400/30 text-red-200 hover:bg-red-500 hover:text-white hover:border-red-400 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
                        }`}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}