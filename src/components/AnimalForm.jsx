// src/components/AnimalForm.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { addDoc, doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function AnimalForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    species: "",
    age: "",
    enclosure: "",
    healthStatus: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(false);

  // 🟢 Prefill when editing with better error handling
  useEffect(() => {
    if (isEdit && id) {
      const loadAnimal = async () => {
        setInitialLoading(true);
        setError("");
        
        try {
          const snap = await getDoc(doc(db, "animals", id));
          
          if (!snap.exists()) {
            setError("Animal not found");
            setTimeout(() => navigate("/dashboard"), 2000);
            return;
          }
          
          setForm(snap.data());
        } catch (err) {
          console.error("Error loading animal:", err);
          setError("Failed to load animal data. Please try again.");
        } finally {
          setInitialLoading(false);
        }
      };
      
      loadAnimal();
    }
  }, [isEdit, id, navigate]);

  const handleChange = (e) => {
    setError(""); // Clear error when user starts typing
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.species.trim()) return "Species is required";
    if (!form.age || parseInt(form.age, 10) < 0) return "Valid age is required";
    if (!form.enclosure.trim()) return "Enclosure is required";
    if (!form.healthStatus.trim()) return "Health status is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = {
        ...form,
        name: form.name.trim(),
        species: form.species.trim(),
        enclosure: form.enclosure.trim(),
        healthStatus: form.healthStatus.trim(),
        age: parseInt(form.age, 10),
      };

      if (isEdit) {
        await updateDoc(doc(db, "animals", id), data);
      } else {
        await addDoc(collection(db, "animals"), data);
      }

      // Show success message briefly before navigating
      setError("");
      navigate("/dashboard", { 
        state: { 
          message: `Animal ${isEdit ? 'updated' : 'created'} successfully!`,
          type: 'success'
        }
      });
    } catch (err) {
      console.error("Error saving animal:", err);
      setError(`Failed to ${isEdit ? 'update' : 'create'} animal. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while fetching data for edit
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent absolute top-0"></div>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Loading Animal Data</h2>
              <p className="text-sm text-gray-600">Please wait while we fetch the information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formFields = [
    { 
      name: "name", 
      type: "text", 
      label: "Animal Name",
      icon: "🐾",
      placeholder: "Enter the animal's name"
    },
    { 
      name: "species", 
      type: "text", 
      label: "Species",
      icon: "🦁",
      placeholder: "e.g., Lion, Elephant, Penguin"
    },
    { 
      name: "age", 
      type: "number", 
      label: "Age (years)",
      icon: "📅",
      min: "0",
      placeholder: "Enter age in years"
    },
    { 
      name: "enclosure", 
      type: "text", 
      label: "Enclosure",
      icon: "🏠",
      placeholder: "e.g., Savanna Habitat, Aquarium Tank A"
    },
    { 
      name: "healthStatus", 
      type: "text", 
      label: "Health Status",
      icon: "🩺",
      placeholder: "e.g., Healthy, Under observation"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4 shadow-lg">
            <span className="text-2xl text-white">{isEdit ? "✏️" : "➕"}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isEdit ? "Edit Animal Profile" : "Add New Animal"}
          </h1>
          <p className="text-gray-600">
            {isEdit ? "Update the animal's information below" : "Fill in the details to add a new animal to the zoo"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid gap-6">
              {formFields.map((field) => (
                <div key={field.name} className="group">
                  <label 
                    htmlFor={field.name}
                    className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2"
                  >
                    <span className="text-lg">{field.icon}</span>
                    <span>{field.label}</span>
                  </label>
                  <div className="relative">
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/50"
                      required
                      min={field.min}
                      disabled={loading}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        form[field.name] ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-4 rounded-xl transition-all duration-200 disabled:opacity-50 border-2 border-gray-200 hover:border-gray-300"
                disabled={loading}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>↩️</span>
                  <span>Cancel</span>
                </span>
              </button>
              
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Saving...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>{isEdit ? "💾" : "✨"}</span>
                    <span>{isEdit ? "Update Animal" : "Create Animal"}</span>
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-50/50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              All fields are required. Make sure to double-check the information before saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}