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
      <div className="max-w-md mx-auto bg-white text-zinc-900 p-6 rounded shadow">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="ml-2">Loading animal data...</span>
        </div>
      </div>
    );
  }

  const formFields = [
    { name: "name", type: "text", label: "Name" },
    { name: "species", type: "text", label: "Species" },
    { name: "age", type: "number", label: "Age", min: "0" },
    { name: "enclosure", type: "text", label: "Enclosure" },
    { name: "healthStatus", type: "text", label: "Health Status" },
  ];

  return (
    <div className="max-w-md mx-auto bg-white text-zinc-900 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Animal" : "Add New Animal"}
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name}>
            <label 
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
              min={field.min}
              disabled={loading}
            />
          </div>
        ))}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </span>
            ) : (
              isEdit ? "Update" : "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}