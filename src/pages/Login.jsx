// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd]   = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { role, loading } = useAuth();   // now we *use* role & loading
 
  // 👇 Console-log where the values are defined
  // This will help us debug if they are undefined
  console.log("Login.jsx → loading:", loading, "| role:", role);
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
      // No immediate navigate here — we’ll redirect once role is known
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔀 Redirect once AuthContext finishes loading and we know the role
  useEffect(() => {
    if (!loading && role) {
      const path =
        role === "admin"
          ? "/dashboard"
          : role === "zookeeper"
          ? "/feeding"
          : role === "vet"
          ? "/medical"
          : "/dashboard"; // researcher / fallback
      navigate(path, { replace: true });
    }
  }, [loading, role, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-xl w-80 space-y-4"
      >
        <h1 className="text-white text-2xl font-bold text-center">
          🐾 ZooKeeper Hub
        </h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded p-2"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}
