  // src/pages/AnimalList.jsx
  import { useEffect, useState } from "react";
  import { db } from "../firebase";
  import { collection, getDocs } from "firebase/firestore";
  import { 
    Search, 
    Loader2, 
    Zap, 
    Users, 
    Heart, 
    Calendar,
    MapPin,
    Activity,
    PawPrint,
    Crown,
    TreePine,
    Mountain,
    Bird,
    Fish,
    Rabbit,
    Bug,
    Turtle,
    Cat
  } from "lucide-react";

  export default function AnimalList() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const fetchAnimals = async () => {
        try {
          const snapshot = await getDocs(collection(db, "animals"));
          const animalData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAnimals(animalData);
        } catch (error) {
          console.error("Error fetching animals:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAnimals();
    }, []);

    const filteredAnimals = animals.filter(animal =>
      animal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getHealthStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'excellent':
        case 'healthy':
          return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-200';
        case 'good':
          return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-200';
        case 'fair':
        case 'under observation':
          return 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-amber-200';
        case 'poor':
        case 'sick':
          return 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-red-200';
        default:
          return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-gray-200';
      }
    };

    const getSpeciesIcon = (species) => {
      const speciesLower = species?.toLowerCase() || '';
      const iconProps = { size: 48, className: "text-white drop-shadow-lg" };
      
      if (speciesLower.includes('lion')) return <Crown {...iconProps} className="text-yellow-300 drop-shadow-lg" />;
      if (speciesLower.includes('tiger')) return <Cat {...iconProps} className="text-orange-300 drop-shadow-lg" />;
      if (speciesLower.includes('elephant')) return <Mountain {...iconProps} className="text-gray-300 drop-shadow-lg" />;
      if (speciesLower.includes('giraffe')) return <TreePine {...iconProps} className="text-yellow-200 drop-shadow-lg" />;
      if (speciesLower.includes('zebra')) return <Zap {...iconProps} className="text-white drop-shadow-lg" />;
      if (speciesLower.includes('monkey') || speciesLower.includes('ape')) return <Users {...iconProps} className="text-amber-300 drop-shadow-lg" />;
      if (speciesLower.includes('bear')) return <Mountain {...iconProps} className="text-amber-400 drop-shadow-lg" />;
      if (speciesLower.includes('wolf')) return <Cat {...iconProps} className="text-gray-400 drop-shadow-lg" />;
      if (speciesLower.includes('bird')) return <Bird {...iconProps} className="text-sky-300 drop-shadow-lg" />;
      if (speciesLower.includes('snake')) return <Bug {...iconProps} className="text-green-400 drop-shadow-lg" />;
      if (speciesLower.includes('turtle')) return <Turtle {...iconProps} className="text-emerald-400 drop-shadow-lg" />;
      if (speciesLower.includes('penguin')) return <Bird {...iconProps} className="text-blue-200 drop-shadow-lg" />;
      if (speciesLower.includes('fish')) return <Fish {...iconProps} className="text-cyan-300 drop-shadow-lg" />;
      if (speciesLower.includes('rabbit')) return <Rabbit {...iconProps} className="text-pink-300 drop-shadow-lg" />;
      
      return <PawPrint {...iconProps} />;
    };

    const getStatIcon = (type) => {
      const iconProps = { size: 56, className: "animate-pulse drop-shadow-xl" };
      switch (type) {
        case 'total':
          return <Crown {...iconProps} className="text-yellow-300 animate-pulse drop-shadow-xl" />;
        case 'species':
          return <TreePine {...iconProps} className="text-emerald-300 animate-pulse drop-shadow-xl" />;
        case 'healthy':
          return <Heart {...iconProps} className="text-pink-300 animate-pulse drop-shadow-xl" />;
        default:
          return <PawPrint {...iconProps} />;
      }
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="relative">
                <Loader2 className="w-20 h-20 text-white animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-emerald-300 animate-pulse" />
                </div>
              </div>
              <p className="text-white/80 text-xl mt-6 animate-pulse">Loading our amazing animals...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-60 right-20 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="mb-6">
                <h1 className="text-6xl md:text-7xl font-black mb-4">
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                    Wildlife Sanctuary
                  </span>
                </h1>
                <div className="flex justify-center space-x-4 text-4xl animate-bounce-sequence">
                  <Crown className="w-12 h-12 text-yellow-300 animate-bounce" style={{animationDelay: '0s'}} />
                  <Mountain className="w-12 h-12 text-gray-300 animate-bounce" style={{animationDelay: '0.1s'}} />
                  <TreePine className="w-12 h-12 text-emerald-300 animate-bounce" style={{animationDelay: '0.2s'}} />
                  <Bird className="w-12 h-12 text-sky-300 animate-bounce" style={{animationDelay: '0.3s'}} />
                  <PawPrint className="w-12 h-12 text-white animate-bounce" style={{animationDelay: '0.4s'}} />
                </div>
              </div>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover and explore our amazing animal residents in their natural habitats
              </p>
              
              {/* Enhanced Search Bar */}
              <div className="max-w-lg mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search animals or species..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 focus:border-white/40 focus:outline-none transition-all duration-300 text-white placeholder-white/60 text-lg shadow-2xl"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-lg font-medium">Total Animals</p>
                      <p className="text-4xl font-black text-white mt-2">{animals.length}</p>
                    </div>
                    {getStatIcon('total')}
                  </div>
                  <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-fill-bar"></div>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-lg font-medium">Species Count</p>
                      <p className="text-4xl font-black text-white mt-2">{new Set(animals.map(a => a.species)).size}</p>
                    </div>
                    {getStatIcon('species')}
                  </div>
                  <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-fill-bar" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-lg font-medium">Healthy Animals</p>
                      <p className="text-4xl font-black text-white mt-2">
                        {animals.filter(a => a.healthStatus?.toLowerCase().includes('healthy') || a.healthStatus?.toLowerCase().includes('excellent')).length}
                      </p>
                    </div>
                    {getStatIcon('healthy')}
                  </div>
                  <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-fill-bar" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAnimals.map((animal, index) => (
                <div
                  key={animal.id}
                  className="group relative animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-teal-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 h-full">
                    {/* Animal Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all duration-300">
                          <div className="group-hover:scale-110 transition-transform duration-300">
                            {getSpeciesIcon(animal.species)}
                          </div>
                          <div className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-white/10"></div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
                            {animal.name}
                          </h3>
                          <p className="text-white/70 text-lg">{animal.species}</p>
                        </div>
                      </div>
                    </div>

                    {/* Animal Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-white/60" />
                          <span className="text-white/80 font-medium">Age</span>
                        </div>
                        <span className="bg-gradient-to-r from-white/20 to-white/10 px-4 py-2 rounded-full text-white font-bold backdrop-blur-sm">
                          {animal.age} {animal.age === 1 ? 'year' : 'years'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-white/60" />
                          <span className="text-white/80 font-medium">Health</span>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getHealthStatusColor(animal.healthStatus)} transform hover:scale-105 transition-transform`}>
                          {animal.healthStatus}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-white/60" />
                          <span className="text-white/80 font-medium">Enclosure</span>
                        </div>
                        <span className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm">
                          {animal.enclosure}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Elements */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Empty State */}
            {filteredAnimals.length === 0 && !loading && (
              <div className="text-center py-20 animate-fade-in">
                <div className="relative mb-8">
                  <Search className="w-24 h-24 text-white/40 mx-auto mb-4 animate-bounce" />
                  <div className="absolute inset-0 flex justify-center">
                    <Search className="w-24 h-24 text-white/10 animate-ping" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-4">No animals found</h3>
                <p className="text-white/70 text-xl">Try adjusting your search terms to discover more creatures</p>
                <div className="mt-8 flex justify-center space-x-4">
                  <Crown className="w-8 h-8 text-yellow-300 animate-bounce" style={{animationDelay: '0s'}} />
                  <Mountain className="w-8 h-8 text-gray-300 animate-bounce" style={{animationDelay: '0.2s'}} />
                  <TreePine className="w-8 h-8 text-emerald-300 animate-bounce" style={{animationDelay: '0.4s'}} />
                </div>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(50px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(-5deg); }
          }
          
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes fill-bar {
            from { width: 0%; }
            to { width: 100%; }
          }
          
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          
          .animate-slide-up {
            animation: slide-up 0.8s ease-out both;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
          
          .animate-float-slow {
            animation: float-slow 10s ease-in-out infinite;
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          
          .animate-fill-bar {
            animation: fill-bar 2s ease-out both;
          }
        `}</style>
      </div>
    );
  }