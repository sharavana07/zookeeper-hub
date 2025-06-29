// src/pages/ResearchPage.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function ResearchPage() {
  const [animals,  setAnimals]  = useState([]);
  const [feedings, setFeedings] = useState([]);
  const [medical,  setMedical]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState("");
  const [activeTab, setActiveTab] = useState("animals");

  /* ───── real‑time fetch ───── */
  useEffect(() => {
    try {
      const unsubAnimals = onSnapshot(
        collection(db, "animals"),
        (snap) => setAnimals(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      );

      const unsubFeedings = onSnapshot(
        query(collection(db, "feedingLogs"), orderBy("feedingTime", "desc")),
        (snap) => setFeedings(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      );

      const unsubMedical = onSnapshot(
        query(collection(db, "medicalLogs"), orderBy("date", "desc")),
        (snap) => setMedical(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      );

      const timer = setTimeout(() => setLoading(false), 500);
      return () => {
        unsubAnimals();
        unsubFeedings();
        unsubMedical();
        clearTimeout(timer);
      };
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
      setLoading(false);
    }
  }, []);

  /** pretty‑print timestamps or date strings */
  const fmt = (val) => {
    if (!val) return "—";
    if (typeof val.toDate === "function") return val.toDate().toLocaleString();
    if (val.seconds) return new Date(val.seconds * 1000).toLocaleString();
    return String(val);
  };

  const q = search.toLowerCase();

  /* ───── filtered arrays ───── */
  const filteredAnimals = animals.filter(
    (a) =>
      a.name?.toLowerCase().includes(q) ||
      a.species?.toLowerCase().includes(q)
  );

  const filteredFeedings = feedings.filter(
    (f) =>
      f.animalName?.toLowerCase().includes(q) ||
      f.foodType?.toLowerCase().includes(q) ||
      f.notes?.toLowerCase().includes(q)
  );

  const filteredMedical = medical.filter(
    (m) =>
      m.animalId?.toLowerCase().includes(q) ||
      m.diagnosis?.toLowerCase().includes(q) ||
      m.notes?.toLowerCase().includes(q) ||
      m.treatment?.toLowerCase().includes(q)
  );

  /* ───── ui states ───── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="text-center z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 shadow-2xl">
          <div className="relative mb-8">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-emerald-300 border-t-transparent"></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Loading Research Data</h2>
            <p className="text-emerald-200">Gathering animal care insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center relative overflow-hidden">
        {/* Error Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 left-32 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg p-12 rounded-2xl shadow-2xl text-center max-w-md border border-red-400/30 z-10">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-400/30">
            <svg className="w-10 h-10 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Connection Error</h3>
          <p className="text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  const getHealthStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'sick': return 'bg-red-100 text-red-800 border-red-200';
      case 'injured': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'animals', label: 'Animals', icon: '🦓', count: filteredAnimals.length },
    { id: 'feedings', label: 'Feedings', icon: '🍽', count: filteredFeedings.length },
    { id: 'medical', label: 'Medical', icon: '🩺', count: filteredMedical.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-3xl">📚</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Research Dashboard</h1>
              <p className="text-emerald-200 text-lg">Comprehensive animal care monitoring system</p>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search animals, treatments, feedings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-white placeholder-white/50 text-lg transition-all duration-300 hover:bg-white/15"
            />
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white/10 backdrop-blur-lg p-2 rounded-2xl shadow-lg border border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-emerald-600 shadow-lg transform scale-105'
                    : 'text-emerald-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-lg">{tab.label}</span>
                <span className={`px-3 py-1 text-sm rounded-full font-bold ${
                  activeTab === tab.id ? 'bg-emerald-100 text-emerald-600' : 'bg-white/20 text-emerald-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Content Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Animals Tab */}
          {activeTab === 'animals' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🦓</span>
                Animals Collection ({filteredAnimals.length})
              </h2>
              {filteredAnimals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <p className="text-xl text-emerald-200">No animals match your search criteria</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredAnimals.map((a) => (
                    <div key={a.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{a.name}</h3>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getHealthStatusColor(a.healthStatus)}`}>
                          {a.healthStatus || 'Unknown'}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                          <span className="text-gray-700"><span className="font-semibold">Species:</span> {a.species}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                          <span className="text-gray-700"><span className="font-semibold">Age:</span> {a.age}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Feedings Tab */}
          {activeTab === 'feedings' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🍽</span>
                Feeding Records ({filteredFeedings.length})
              </h2>
              {filteredFeedings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <p className="text-xl text-emerald-200">No feeding logs match your search criteria</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredFeedings.map((f) => (
                    <div key={f.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {f.animalName?.trim() || "Unknown Animal"}
                        </h3>
                        <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 font-medium">
                          {fmt(f.feedingTime)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <span className="font-semibold text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                            Food Type:
                          </span>
                          <p className="text-gray-700 ml-4">{f.foodType}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="font-semibold text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                            Quantity:
                          </span>
                          <p className="text-gray-700 ml-4">{f.quantity}</p>
                        </div>
                      </div>
                      {f.notes && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                          <span className="font-semibold text-emerald-800 text-sm">Notes:</span>
                          <p className="text-emerald-700 mt-2">{f.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Medical Tab */}
          {activeTab === 'medical' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🩺</span>
                Medical Records ({filteredMedical.length})
              </h2>
              {filteredMedical.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <p className="text-xl text-emerald-200">No medical logs match your search criteria</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredMedical.map((m) => (
                    <div key={m.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{m.animalId}</h3>
                        <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 font-medium">
                          {fmt(m.date)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <span className="font-semibold text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                            Diagnosis:
                          </span>
                          <p className="text-gray-700 ml-4">{m.diagnosis || "—"}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="font-semibold text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                            Treatment:
                          </span>
                          <p className="text-gray-700 ml-4">{m.treatment || "No treatment"}</p>
                        </div>
                      </div>
                      {m.notes && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-l-4 border-red-300">
                          <span className="font-semibold text-red-800 text-sm">Medical Notes:</span>
                          <p className="text-red-700 mt-2">{m.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}