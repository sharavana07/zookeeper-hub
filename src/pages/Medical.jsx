// src/pages/Medical.jsx
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Medical() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [medicalLogs, setMedicalLogs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "medicalLogs"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedicalLogs(logs);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleAddLog = () => {
    navigate("/medical/new");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">🩺 Medical Records</h1>

      <p className="mb-2">👤 UID: {user?.uid}</p>
      <p className="mb-6">🔐 Role: {role}</p>

      <button
        onClick={handleAddLog}
        className="mb-6 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        ➕ Add New Medical Log
      </button>

      {medicalLogs.length === 0 ? (
        <p>No medical logs yet.</p>
      ) : (
        <div className="space-y-4">
          {medicalLogs.map((log) => (
            <div
              key={log.id}
              className="bg-zinc-800 p-4 rounded shadow hover:bg-zinc-700"
            >
              <p><strong>🆔 Animal ID:</strong> {log.animalId}</p>
              <p><strong>📅 Date:</strong> {log.date}</p>
              <p><strong>🩻 Diagnosis:</strong> {log.diagnosis}</p>
              <p><strong>💊 Treatment:</strong> {log.treatment}</p>
              <p><strong>🧾 Notes:</strong> {log.notes}</p>
              <p><strong>📋 Follow-Up:</strong> {log.followUpRequired ? "Yes" : "No"}</p>
              <p className="text-sm text-zinc-400">👨‍⚕️ Vet ID: {log.vetId}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
