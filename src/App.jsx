// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Feeding from "./pages/Feeding";
import Medical from "./pages/Medical";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected pages */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allow={["admin", "researcher"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feeding"
            element={
              <ProtectedRoute allow={["zookeeper"]}>
                <Feeding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical"
            element={
              <ProtectedRoute allow={["vet"]}>
                <Medical />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
