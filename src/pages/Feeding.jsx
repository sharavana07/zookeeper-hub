// src/pages/Feeding.jsx
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import FeedingForm from "../components/FeedingForm";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function Feeding() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);   // ← NEW

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ─── Real‑time listener ────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "feedingLogs"),
      orderBy("feedingTime", "desc")
    );

    return onSnapshot(q, (snap) =>
      setLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [user]);

  // ─── UI ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">🥕 Feeding Log</h1>

      <p className="mb-2">👤 UID: {user?.uid}</p>
      <p className="mb-6">🔐 Role: {role}</p>

      {/* ── Toggle button ── */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow"
      >
        {showForm ? "Close Form" : "➕ Add Feeding Log"}
      </button>

      {/* ── Conditionally render form ── */}
      {showForm && (
        <div className="bg-gray-100 text-black p-4 rounded shadow mt-4">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            New Feeding Entry
          </h2>
          {/* Pass a callback so the form can auto‑close after submit if you like */}
          <FeedingForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {/* ── Past logs ── */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">📋 Past Feeding Logs</h2>

        {logs.length === 0 ? (
          <p className="text-gray-100">No feeding logs found.</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log) => (
              <li key={log.id} className="bg-zinc-700 p-3 rounded">
                <p><strong>Animal:</strong> {log.animalName}</p>
                <p><strong>Food:</strong> {log.foodType}</p>
                <p><strong>Quantity:</strong> {log.quantity}</p>
                {log.notes && <p><strong>Notes:</strong> {log.notes}</p>}
                <p>
                  <strong>Time:</strong>{" "}
                  {log.feedingTime?.toDate().toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 hover:bg-red-900 px-4 py-2 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
