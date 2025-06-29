import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AnimalForm from "../components/AnimalForm";
import { 
  UserCircle, 
  Shield, 
  Stethoscope, 
  Heart, 
  Eye,
  Plus,
  Settings,
  Users,
  PawPrint,
  Edit,
  Trash2,
  Clock,
  Home,
  Loader2,
  FileText,
  Syringe,
  Calendar,
  CheckSquare,
  Utensils,
  Wrench,
  Map,
  Binoculars,
  Timer,
  Sparkles
} from "lucide-react";

function Dashboard() {
  const { user, role} = useAuth();
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch animals for admins only
  useEffect(() => {
    if (role === "admin") {
      const fetchAnimals = async () => {
        setLoading(true);
        try {
          const snap = await getDocs(collection(db, "animals"));
          const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAnimals(list);
        } catch (error) {
          console.error("Error fetching animals:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAnimals();
    }
  }, [role]);

  const handleDeleteAnimal = async (animalId) => {
    if (window.confirm("Are you sure you want to delete this animal?")) {
      try {
        await deleteDoc(doc(db, "animals", animalId));
        setAnimals((prev) => prev.filter((animal) => animal.id !== animalId));
      } catch (error) {
        console.error("Error deleting animal:", error);
      }
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-gradient-to-r from-emerald-600 to-teal-500';
      case 'veterinarian': return 'bg-gradient-to-r from-emerald-500 to-cyan-400';
      case 'keeper': return 'bg-gradient-to-r from-teal-500 to-emerald-400';
      case 'visitor': return 'bg-gradient-to-r from-cyan-500 to-teal-400';
      default: return 'bg-gradient-to-r from-emerald-900 to-teal-900';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'veterinarian': return <Stethoscope className="w-4 h-4" />;
      case 'keeper': return <Heart className="w-4 h-4" />;
      case 'visitor': return <Eye className="w-4 h-4" />;
      default: return <UserCircle className="w-4 h-4" />;
    }
  };

  const getRoleText = (role) => {
    switch(role) {
      case 'admin': return 'Administrator';
      case 'veterinarian': return 'Veterinarian';
      case 'keeper': return 'Animal Keeper';
      case 'visitor': return 'Visitor';
      default: return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-400/20"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="w-8 h-8 text-emerald-300" />
                )}
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome back, {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0]}!
                </h1>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-white font-semibold ${getRoleColor(role)}`}>
                  {getRoleIcon(role)}
                  <span className="text-sm font-medium">{getRoleText(role)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Admin Section */}
          {role === "admin" && (
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/30">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Settings className="w-6 h-6 text-emerald-300 mr-3" />
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => navigate("/animals/new")} 
                    className="group bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-emerald-400/30"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Plus className="w-5 h-5" />
                      <span>Add New Animal</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => navigate("/animals")} 
                    className="group bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-600 hover:to-cyan-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-teal-400/30"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <PawPrint className="w-5 h-5" />
                      <span>Manage Animals</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => navigate("/users")} 
                    className="group bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-cyan-400/30"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Users className="w-5 h-5" />
                      <span>Manage Users</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Animals Overview */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <PawPrint className="w-6 h-6 text-emerald-300 mr-3" />
                    Animals Overview
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-emerald-200 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                    <PawPrint className="w-4 h-4" />
                    <span>{animals.length} Total Animals</span>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {animals.map(a => (
                      <div key={a.id} className="group bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{a.name}</h4>
                            <p className="text-emerald-200 text-sm">{a.species}</p>
                          </div>
                          <div className="w-10 h-10 bg-emerald-300/20 rounded-full flex items-center justify-center border border-emerald-400/30">
                            <PawPrint className="w-5 h-5 text-emerald-300" />
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-emerald-200">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="w-10 font-medium">Age:</span>
                            <span className="bg-teal-500/20 text-teal-200 px-2 py-1 rounded-full text-xs border border-teal-400/30 ml-2">
                              {a.age} years
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-emerald-200">
                            <Home className="w-4 h-4 mr-2" />
                            <span className="w-10 font-medium">Home:</span>
                            <span className="bg-emerald-500/20 text-emerald-200 px-2 py-1 rounded-full text-xs border border-emerald-400/30 ml-2">
                              {a.enclosure}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => navigate(`/animals/${a.id}/edit`)} 
                            className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-600 hover:to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-teal-400/30 flex items-center justify-center space-x-2"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteAnimal(a.id)} 
                            className="flex-1 bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-red-400/30 flex items-center justify-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    {animals.length === 0 && (
                      <div className="col-span-full text-center py-12">
                        <div className="w-16 h-16 bg-emerald-300/20 rounded-full mx-auto mb-4 flex items-center justify-center border border-emerald-400/30">
                          <PawPrint className="w-8 h-8 text-emerald-300" />
                        </div>
                        <p className="text-emerald-200 text-lg">No animals in database yet.</p>
                        <p className="text-emerald-300/70 text-sm">Add your first animal to get started!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Veterinarian Section */}
          {role === "veterinarian" && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/30">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Stethoscope className="w-6 h-6 text-emerald-300 mr-3" />
                Veterinarian Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => navigate("/health-records")} 
                  className="group bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-emerald-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Health Records</div>
                  <div className="text-sm opacity-90">Track animal health</div>
                </button>
                <button 
                  onClick={() => navigate("/medical-treatments")} 
                  className="group bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-600 hover:to-cyan-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-teal-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Syringe className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Medical Treatments</div>
                  <div className="text-sm opacity-90">Manage treatments</div>
                </button>
                <button 
                  onClick={() => navigate("/vaccination-schedule")} 
                  className="group bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-cyan-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Vaccination Schedule</div>
                  <div className="text-sm opacity-90">Track vaccinations</div>
                </button>
              </div>
            </div>
          )}

          {/* Keeper Section */}
          {role === "keeper" && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/30">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Heart className="w-6 h-6 text-emerald-300 mr-3" />
                Keeper Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => navigate("/daily-care")} 
                  className="group bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-emerald-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Daily Care Tasks</div>
                  <div className="text-sm opacity-90">Manage daily routines</div>
                </button>
                <button 
                  onClick={() => navigate("/feeding-schedule")} 
                  className="group bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-600 hover:to-cyan-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-teal-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Feeding Schedule</div>
                  <div className="text-sm opacity-90">Plan feeding times</div>
                </button>
                <button 
                  onClick={() => navigate("/enclosure-maintenance")} 
                  className="group bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-cyan-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Enclosure Maintenance</div>
                  <div className="text-sm opacity-90">Maintain habitats</div>
                </button>
              </div>
            </div>
          )}

          {/* Visitor Section */}
          {role === "visitor" && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/30">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Eye className="w-6 h-6 text-emerald-300 mr-3" />
                Visitor Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => navigate("/zoo-map")} 
                  className="group bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-emerald-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Zoo Map</div>
                  <div className="text-sm opacity-90">Find your way</div>
                </button>
                <button 
                  onClick={() => navigate("/animal-exhibits")} 
                  className="group bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-600 hover:to-cyan-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-teal-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Binoculars className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Animal Exhibits</div>
                  <div className="text-sm opacity-90">Explore animals</div>
                </button>
                <button 
                  onClick={() => navigate("/feeding-times")} 
                  className="group bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-cyan-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Timer className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Feeding Times</div>
                  <div className="text-sm opacity-90">Don't miss feeding</div>
                </button>
                <button 
                  onClick={() => navigate("/events")} 
                  className="group bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-emerald-400/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-lg">Special Events</div>
                  <div className="text-sm opacity-90">Join the fun</div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;