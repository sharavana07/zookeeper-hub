// src/pages/Feeding.jsx
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import FeedingForm from "../components/FeedingForm";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { 
  Utensils, User,Shield, 
  Plus, 
  X, 
  ClipboardList, 
  FileText,
  Calendar,
  Scale,
  PawPrint,
  LogOut,
  Clock
} from "lucide-react";

export default function Feeding() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ─── Real‑time listener ────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "feedingLogs"),
      orderBy("feedingTime", "desc")
    );

    return onSnapshot(q, (snap) =>
      setLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [user]);

  // ─── UI ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white relative overflow-hidden">
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-1000"></div>

      <div className="relative z-10 p-6 md:p-8">
        {/* Enhanced Header Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-emerald-400/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl shadow-lg">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
              Feeding Management
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-4 text-emerald-200">
            <div className="flex items-center gap-3 bg-emerald-500/20 px-5 py-3 rounded-2xl border border-emerald-400/30 hover:bg-emerald-500/25 transition-all duration-300">
              <div className="p-2 bg-emerald-400/30 rounded-lg">
                <User className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="font-medium">UID:</span>
              <span className="text-emerald-100 font-mono text-sm bg-emerald-900/30 px-2 py-1 rounded">
                {user?.uid}
              </span>
            </div>
            <div className="flex items-center gap-3 bg-teal-500/20 px-5 py-3 rounded-2xl border border-teal-400/30 hover:bg-teal-500/25 transition-all duration-300">
              <div className="p-2 bg-teal-400/30 rounded-lg">
                <Shield className="w-4 h-4 text-teal-300" />
              </div>
              <span className="font-medium">Role:</span>
              <span className="text-teal-100 font-semibold capitalize bg-teal-900/30 px-2 py-1 rounded">
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Action Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="group relative bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 px-8 py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-emerald-400/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                {showForm ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Plus className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="font-semibold text-lg">
                {showForm ? "Close Form" : "Add New Feeding Log"}
              </span>
            </div>
          </button>
        </div>

        {/* Enhanced Form Section */}
        {showForm && (
          <div className="mb-8 animate-in slide-in-from-top-4 duration-500">
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-emerald-400/30 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl shadow-lg">
                  <Utensils className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-300">
                  New Feeding Entry
                </h2>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-emerald-400/20">
                <FeedingForm onSuccess={() => setShowForm(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Past Logs Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-emerald-400/30 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl shadow-lg">
                <ClipboardList className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-300">
                Feeding History
              </h2>
            </div>
            <div className="bg-emerald-500/20 px-4 py-2 rounded-2xl border border-emerald-400/30">
              <span className="text-emerald-200 font-medium">
                {logs.length} {logs.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-6 bg-white/5 rounded-3xl w-fit mx-auto mb-6 border border-emerald-400/20">
                <Utensils className="w-16 h-16 text-emerald-300/50 mx-auto" />
              </div>
              <p className="text-emerald-200 text-lg">
                No feeding logs found. Start by adding your first entry!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {logs.map((log, index) => (
                <div
                  key={log.id}
                  className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Hover effect gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                  
                  <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-400/20 rounded-lg">
                          <PawPrint className="w-4 h-4 text-emerald-300" />
                        </div>
                        <span className="text-emerald-200 font-medium">Animal:</span>
                        <span className="text-white font-semibold">{log.animalName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-400/20 rounded-lg">
                          <Utensils className="w-4 h-4 text-teal-300" />
                        </div>
                        <span className="text-teal-200 font-medium">Food:</span>
                        <span className="text-white">{log.foodType}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-400/20 rounded-lg">
                          <Scale className="w-4 h-4 text-cyan-300" />
                        </div>
                        <span className="text-cyan-200 font-medium">Quantity:</span>
                        <span className="text-white font-semibold">{log.quantity}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-400/20 rounded-lg">
                          <Clock className="w-4 h-4 text-emerald-300" />
                        </div>
                        <span className="text-emerald-200 font-medium">Time:</span>
                        <span className="text-white text-sm font-mono bg-emerald-900/20 px-2 py-1 rounded">
                          {log.feedingTime?.toDate().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {log.notes && (
                      <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-teal-400/20 rounded-lg mt-1">
                            <FileText className="w-4 h-4 text-teal-300" />
                          </div>
                          <div className="flex-1">
                            <span className="text-teal-200 font-medium">Notes:</span>
                            <p className="text-white text-sm mt-2 bg-white/10 p-3 rounded-xl border border-teal-400/20 leading-relaxed">
                              {log.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Logout Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="group bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 px-8 py-4 rounded-2xl shadow-lg border border-red-400/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg text-red-200 group-hover:text-white">
                Sign Out
              </span>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}