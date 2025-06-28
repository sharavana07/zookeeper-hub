import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

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
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair':
      case 'under observation':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor':
      case 'sick':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpeciesEmoji = (species) => {
    const speciesLower = species?.toLowerCase() || '';
    if (speciesLower.includes('lion')) return '🦁';
    if (speciesLower.includes('tiger')) return '🐅';
    if (speciesLower.includes('elephant')) return '🐘';
    if (speciesLower.includes('giraffe')) return '🦒';
    if (speciesLower.includes('zebra')) return '🦓';
    if (speciesLower.includes('monkey') || speciesLower.includes('ape')) return '🐵';
    if (speciesLower.includes('bear')) return '🐻';
    if (speciesLower.includes('wolf')) return '🐺';
    if (speciesLower.includes('bird')) return '🦅';
    if (speciesLower.includes('snake')) return '🐍';
    if (speciesLower.includes('turtle')) return '🐢';
    if (speciesLower.includes('penguin')) return '🐧';
    return '🐾';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-12 bg-gray-200 rounded-lg mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            🐾 Wildlife Sanctuary
          </h1>
          <p className="text-xl text-gray-600 mb-6">Discover and explore our amazing animal residents</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search animals or species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Animals</p>
                <p className="text-3xl font-bold text-emerald-600">{animals.length}</p>
              </div>
              <div className="text-4xl">🦁</div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Species Count</p>
                <p className="text-3xl font-bold text-teal-600">{new Set(animals.map(a => a.species)).size}</p>
              </div>
              <div className="text-4xl">🦒</div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Healthy Animals</p>
                <p className="text-3xl font-bold text-cyan-600">
                  {animals.filter(a => a.healthStatus?.toLowerCase().includes('healthy') || a.healthStatus?.toLowerCase().includes('excellent')).length}
                </p>
              </div>
              <div className="text-4xl">💚</div>
            </div>
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAnimals.map((animal, index) => (
            <div
              key={animal.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl animate-bounce">
                    {getSpeciesEmoji(animal.species)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{animal.name}</h3>
                    <p className="text-sm text-gray-600">{animal.species}</p>
                  </div>
                </div>
              </div>

              {/* Animal Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Age</span>
                  <span className="font-semibold bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {animal.age} {animal.age === 1 ? 'year' : 'years'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Health</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getHealthStatusColor(animal.healthStatus)}`}>
                    {animal.healthStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Enclosure</span>
                  <span className="font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                    {animal.enclosure}
                  </span>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 hover:from-emerald-500/5 hover:to-teal-500/5 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnimals.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No animals found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}