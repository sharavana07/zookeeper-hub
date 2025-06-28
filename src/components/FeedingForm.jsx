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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "feedingLogs"), {
        ...formData,
        feedingTime: serverTimestamp(),
      });
      toast.success("Feeding log submitted!");
      setFormData({ animalName: "", foodType: "", quantity: "", notes: "" });
    } catch (err) {
      console.error(err);
      toast.error("Error submitting log.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Feeding Log</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="animalName"
          value={formData.animalName}
          onChange={handleChange}
          placeholder="Animal Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          placeholder="Food Type"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity (kg)"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional Notes (optional)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Log
        </button>
      </form>
    </div>
  );
}
