// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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
          <Route path="/login" element={<Login />} />

          {/* Admin + Researcher */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allow={["admin", "researcher"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Zookeeper only */}
          <Route
            path="/feeding"
            element={
              <ProtectedRoute allow={["zookeeper"]}>
                <Feeding />
              </ProtectedRoute>
            }
          />

          {/* Vet only */}
          <Route
            path="/medical"
            element={
              <ProtectedRoute allow={["vet"]}>
                <Medical />
              </ProtectedRoute>
            }
          />

          {/* Default fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
