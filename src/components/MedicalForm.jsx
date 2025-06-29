// src/components/MedicalForm.jsx
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function MedicalForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    animalId: "",
    date: new Date().toISOString().split("T")[0],
    diagnosis: "",
    treatment: "",
    followUpRequired: false,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "medicalLogs"), { ...formData, vetId: user.uid });
      navigate("/medical");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-in fade-in duration-700">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl w-full space-y-6 bg-zinc-800/70 backdrop-blur-md p-8 rounded-2xl shadow-lg 
                   transform transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10
                   animate-in slide-in-from-bottom-8 delay-100"
      >
        {/* Header */}
        <div className="animate-in slide-in-from-top-4 duration-500 delay-100">
          <h2 className="text-xl font-semibold text-emerald-400 flex items-center gap-2 
                         hover:text-emerald-300 transition-colors duration-300">
            <span className="material-symbols-outlined text-2xl animate-pulse">medical_information</span>
            Add Medical Log
          </h2>
        </div>

        {/* Animal ID */}
        <div className="animate-in slide-in-from-left-4 duration-500 delay-200">
          <label className="block mb-1 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-emerald-300">
            Animal ID
          </label>
          <input
            type="text"
            name="animalId"
            placeholder="e.g. ANML-001"
            value={formData.animalId}
            onChange={handleChange}
            className="w-full rounded-lg bg-zinc-700 p-3 placeholder:text-zinc-400 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-zinc-600
                       transition-all duration-300 hover:bg-zinc-600 transform hover:scale-[1.02]"
            required
          />
        </div>

        {/* Date & Follow‑up in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500 delay-300">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-emerald-300">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg bg-zinc-700 p-3
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-zinc-600
                         transition-all duration-300 hover:bg-zinc-600 transform hover:scale-[1.02]"
              required
            />
          </div>

          <div className="flex items-center gap-3 mt-8 sm:mt-0">
            <div className="relative">
              <input
                type="checkbox"
                name="followUpRequired"
                checked={formData.followUpRequired}
                onChange={handleChange}
                className="h-5 w-5 accent-emerald-500 rounded transition-transform duration-200 hover:scale-110"
              />
              {formData.followUpRequired && (
                <div className="absolute -inset-1 bg-emerald-500/20 rounded-full animate-ping"></div>
              )}
            </div>
            <label className="text-sm text-zinc-300 transition-colors duration-200 hover:text-emerald-300 cursor-pointer">
              Follow‑up required
            </label>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="animate-in slide-in-from-left-4 duration-500 delay-400">
          <label className="block mb-1 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-emerald-300">
            Diagnosis
          </label>
          <input
            type="text"
            name="diagnosis"
            placeholder="Brief diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="w-full rounded-lg bg-zinc-700 p-3 placeholder:text-zinc-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-zinc-600
                       transition-all duration-300 hover:bg-zinc-600 transform hover:scale-[1.02]"
            required
          />
        </div>

        {/* Treatment */}
        <div className="animate-in slide-in-from-right-4 duration-500 delay-500">
          <label className="block mb-1 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-emerald-300">
            Treatment
          </label>
          <input
            type="text"
            name="treatment"
            placeholder="Medications / procedures"
            value={formData.treatment}
            onChange={handleChange}
            className="w-full rounded-lg bg-zinc-700 p-3 placeholder:text-zinc-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-zinc-600
                       transition-all duration-300 hover:bg-zinc-600 transform hover:scale-[1.02]"
          />
        </div>

        {/* Notes */}
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-600">
          <label className="block mb-1 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-emerald-300">
            Notes
          </label>
          <textarea
            name="notes"
            placeholder="Additional observations..."
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg bg-zinc-700 p-3 placeholder:text-zinc-400 resize-none
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-zinc-600
                       transition-all duration-300 hover:bg-zinc-600 transform hover:scale-[1.02]"
          />
        </div>

        {/* Submit */}
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-700">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800
                       font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                       disabled:cursor-not-allowed disabled:opacity-70 relative overflow-hidden
                       group active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">save</span>
                  Submit Log
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}