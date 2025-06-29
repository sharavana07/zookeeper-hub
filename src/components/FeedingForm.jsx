import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function FeedingForm() {
  const [formData, setFormData] = useState({
    animalName: "",
    foodType: "",
    quantity: "",
    notes: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "feedingLogs"), {
        ...formData,
        feedingTime: serverTimestamp(),
      });
      toast.success("Feeding log submitted successfully! 🎉");
      setFormData({ animalName: "", foodType: "", quantity: "", notes: "" });
    } catch (err) {
      console.error(err);
      toast.error("Error submitting log. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full p-4 border-2 rounded-xl transition-all duration-300 outline-none
    ${focusedField === fieldName 
      ? 'border-green-500 bg-green-50 shadow-lg transform scale-[1.02]' 
      : 'border-gray-200 hover:border-green-300 bg-white'
    }
    placeholder-gray-400 text-gray-700
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4 shadow-lg">
            <span className="text-2xl">🍽️</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Animal Feeding Log
          </h2>
          <p className="text-gray-600">Record feeding details for proper animal care</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transform transition-all duration-300 hover:shadow-2xl">
          <div className="space-y-6">
            {/* Animal Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🐾 Animal Name
              </label>
              <input
                type="text"
                name="animalName"
                value={formData.animalName}
                onChange={handleChange}
                onFocus={() => setFocusedField('animalName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter animal's name (e.g., Bella, Max)"
                required
                className={inputClasses('animalName')}
              />
            </div>

            {/* Food Type Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🥘 Food Type
              </label>
              <input
                type="text"
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                onFocus={() => setFocusedField('foodType')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter food type (e.g., Hay, Pellets, Fish)"
                required
                className={inputClasses('foodType')}
              />
            </div>

            {/* Quantity Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⚖️ Quantity (kg)
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                onFocus={() => setFocusedField('quantity')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter quantity in kilograms"
                step="0.1"
                min="0"
                required
                className={inputClasses('quantity')}
              />
            </div>

            {/* Notes Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Additional Notes
                <span className="text-gray-400 font-normal ml-1">(optional)</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                onFocus={() => setFocusedField('notes')}
                onBlur={() => setFocusedField(null)}
                placeholder="Any special observations, behavior notes, or feeding instructions..."
                rows="4"
                className={`${inputClasses('notes')} resize-none`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`
                w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
                transition-all duration-300 transform
                ${isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
                }
                shadow-md
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>📋</span>
                  <span>Submit Feeding Log</span>
                </div>
              )}
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              All feeding logs are automatically timestamped and securely stored
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">💡 Quick Tips:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Be specific with animal names for easy tracking</li>
            <li>• Include food brand or type for better records</li>
            <li>• Note any unusual behavior or appetite changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}