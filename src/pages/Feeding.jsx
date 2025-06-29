import { useState } from "react";
import { 
  LogOut, 
  Plus, 
  X, 
  FileText, 
  Users, 
  Clock, 
  PawPrint,
  TrendingUp,
  Calendar,
  Package,
  Scale,
  StickyNote,
  CheckCircle
} from "lucide-react";

// Mock hooks and components for demonstration
const useAuth = () => ({
  user: { name: "Demo User" },
  role: "admin",
  logout: async () => console.log("Logged out")
});

const FeedingForm = ({ onSuccess }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-emerald-200 text-sm mb-2">Animal Name</label>
        <input 
          type="text" 
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter animal name"
        />
      </div>
      <div>
        <label className="block text-emerald-200 text-sm mb-2">Food Type</label>
        <input 
          type="text" 
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter food type"
        />
      </div>
    </div>
    <div>
      <label className="block text-emerald-200 text-sm mb-2">Quantity</label>
      <input 
        type="text" 
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        placeholder="Enter quantity"
      />
    </div>
    <div>
      <label className="block text-emerald-200 text-sm mb-2">Notes</label>
      <textarea 
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        rows="3"
        placeholder="Additional notes..."
      />
    </div>
    <button 
      onClick={onSuccess}
      className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
    >
      <CheckCircle size={20} />
      <span>Save Feeding Log</span>
    </button>
  </div>
);

export default function Feeding() {
  const { role, logout } = useAuth();
  const [logs] = useState([
    {
      id: 1,
      animalName: "Max",
      foodType: "Premium Dog Food",
      quantity: "2 cups",
      notes: "Ate well, very energetic",
      feedingTime: new Date()
    },
    {
      id: 2,
      animalName: "Bella",
      foodType: "Cat Kibble",
      quantity: "1 cup",
      notes: "Left some food, monitor appetite",
      feedingTime: new Date(Date.now() - 86400000)
    }
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleLogout = async () => {
    await logout();
    // navigate("/login");
  };

  // ─── UI ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Feeding Dashboard</h1>
                <p className="text-emerald-200 text-sm">Animal Care Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white/90 text-sm font-medium">Welcome back!</p>
                <p className="text-emerald-200 text-xs">Role: {role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-200 text-sm">Total Logs</p>
                <p className="text-2xl font-bold text-white">{logs.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                <FileText className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-200 text-sm">Animals Fed Today</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(logs.filter(log => {
                    const logDate = new Date(log.feedingTime);
                    const today = new Date();
                    return logDate.toDateString() === today.toDateString();
                  }).map(log => log.animalName)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-400/30">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-200 text-sm">Last Fed</p>
                <p className="text-sm font-medium text-white">
                  {logs.length > 0 
                    ? new Date(logs[0].feedingTime).toLocaleDateString()
                    : 'No records'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Feeding Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center space-x-3 ${
              showForm 
                ? 'bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 text-red-200' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 shadow-lg hover:shadow-xl border border-emerald-400/30'
            }`}
          >
            <span className="relative z-10 flex items-center space-x-3">
              {showForm ? (
                <>
                  <X className="w-6 h-6" />
                  <span>Close Form</span>
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  <span>Add New Feeding Log</span>
                </>
              )}
            </span>
            {!showForm && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            )}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8 animate-in slide-in-from-top duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center border border-emerald-400/30">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">New Feeding Entry</h2>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <FeedingForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        )}

        {/* Logs Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-lg flex items-center justify-center border border-teal-400/30">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Feeding History</h2>
            </div>
            <div className="text-emerald-200 text-sm bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/20">
              {logs.length} {logs.length === 1 ? 'entry' : 'entries'}
            </div>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <PawPrint className="w-10 h-10 text-emerald-400 opacity-60" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No feeding logs yet</h3>
              <p className="text-emerald-200">Start by adding your first feeding entry above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div 
                  key={log.id} 
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center border border-emerald-400/30">
                        <PawPrint className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{log.animalName}</h3>
                        <p className="text-emerald-200 text-sm flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(log.feedingTime).toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm border border-emerald-400/30 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Fed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-2 mb-1">
                        <Package className="w-4 h-4 text-emerald-200" />
                        <p className="text-emerald-200 text-sm">Food Type</p>
                      </div>
                      <p className="text-white font-medium">{log.foodType}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-2 mb-1">
                        <Scale className="w-4 h-4 text-emerald-200" />
                        <p className="text-emerald-200 text-sm">Quantity</p>
                      </div>
                      <p className="text-white font-medium">{log.quantity}</p>
                    </div>
                  </div>
                  
                  {log.notes && (
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-2 mb-1">
                        <StickyNote className="w-4 h-4 text-emerald-200" />
                        <p className="text-emerald-200 text-sm">Notes</p>
                      </div>
                      <p className="text-white">{log.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}