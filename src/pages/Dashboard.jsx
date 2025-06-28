import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// src/pages/Dashboard.jsx
import AnimalForm from "../components/AnimalForm";   // ✅ correct
// or, if you prefer aliases defined in vite.config.js
// import AnimalForm from "@/components/AnimalForm";

function Dashboard() {
  const { user, role} = useAuth();
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);

  // Fetch animals for admins only
  useEffect(() => {
    if (role === "admin") {
      const fetchAnimals = async () => {
        try {
          const snap = await getDocs(collection(db, "animals"));
          const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAnimals(list);
        } catch (error) {
          console.error("Error fetching animals:", error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {user?.displayName || user?.email}!
          </h1>
          
          <div className="mb-8">
            <p className="text-lg mb-4">Role: <span className="font-semibold capitalize">{role}</span></p>
            
            {/* Admin Section */}
            {role === "admin" && (
              <>
                <h2 className="text-xl font-semibold mb-2">Admin Tools</h2>
                <ul className="list-disc list-inside ml-4 mb-4">
                  <li 
                    onClick={() => navigate("/animals")} 
                    className="cursor-pointer hover:underline"
                  >
                    Manage Animals
                  </li>
                  <li 
                    onClick={() => navigate("/users")} 
                    className="cursor-pointer hover:underline"
                  >
                    Manage Users
                  </li>
                </ul>
                
                {/* ➕ Add Animal button */}
                <button 
                  onClick={() => navigate("/animals/new")} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded mb-4 transition-colors duration-200"
                >
                  ➕ Add Animal
                </button>
                
                {/* Animal list preview */}
                <h3 className="text-lg font-bold mb-2">Current Animals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {animals.map(a => (
                    <div key={a.id} className="bg-white text-zinc-900 p-4 rounded shadow">
                      <h4 className="font-bold">{a.name}</h4>
                      <p>Species: {a.species}</p>
                      <p>Age: {a.age}</p>
                      <p>Enclosure: {a.enclosure}</p>
                      <div className="mt-3 flex space-x-4 text-sm">
                        <button 
                          onClick={() => navigate(`/animals/${a.id}/edit`)} 
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteAnimal(a.id)} 
                          className="text-red-600 hover:text-red-800 hover:underline font-medium transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {animals.length === 0 && (
                    <p className="text-sm text-gray-400">No animals in database.</p>
                  )}
                </div>
              </>
            )}

            {/* Veterinarian Section */}
            {role === "veterinarian" && (
              <>
                <h2 className="text-xl font-semibold mb-2">Veterinarian Tools</h2>
                <ul className="list-disc list-inside ml-4">
                  <li 
                    onClick={() => navigate("/health-records")} 
                    className="cursor-pointer hover:underline"
                  >
                    Health Records
                  </li>
                  <li 
                    onClick={() => navigate("/medical-treatments")} 
                    className="cursor-pointer hover:underline"
                  >
                    Medical Treatments
                  </li>
                  <li 
                    onClick={() => navigate("/vaccination-schedule")} 
                    className="cursor-pointer hover:underline"
                  >
                    Vaccination Schedule
                  </li>
                </ul>
              </>
            )}

            {/* Keeper Section */}
            {role === "keeper" && (
              <>
                <h2 className="text-xl font-semibold mb-2">Keeper Tools</h2>
                <ul className="list-disc list-inside ml-4">
                  <li 
                    onClick={() => navigate("/daily-care")} 
                    className="cursor-pointer hover:underline"
                  >
                    Daily Care Tasks
                  </li>
                  <li 
                    onClick={() => navigate("/feeding-schedule")} 
                    className="cursor-pointer hover:underline"
                  >
                    Feeding Schedule
                  </li>
                  <li 
                    onClick={() => navigate("/enclosure-maintenance")} 
                    className="cursor-pointer hover:underline"
                  >
                    Enclosure Maintenance
                  </li>
                </ul>
              </>
            )}

            {/* Visitor Section */}
            {role === "visitor" && (
              <>
                <h2 className="text-xl font-semibold mb-2">Visitor Information</h2>
                <ul className="list-disc list-inside ml-4">
                  <li 
                    onClick={() => navigate("/zoo-map")} 
                    className="cursor-pointer hover:underline"
                  >
                    Zoo Map
                  </li>
                  <li 
                    onClick={() => navigate("/animal-exhibits")} 
                    className="cursor-pointer hover:underline"
                  >
                    Animal Exhibits
                  </li>
                  <li 
                    onClick={() => navigate("/feeding-times")} 
                    className="cursor-pointer hover:underline"
                  >
                    Feeding Times
                  </li>
                  <li 
                    onClick={() => navigate("/events")} 
                    className="cursor-pointer hover:underline"
                  >
                    Special Events
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;