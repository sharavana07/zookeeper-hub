// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Feeding from "./pages/Feeding";
import Medical from "./pages/Medical";
import Research from "./pages/Research";
import AnimalList from "./pages/AnimalList";
import AnimalForm from "./components/AnimalForm";
import UsersPage from "./pages/UsersPage";
import MedicalFormPage from "./pages/MedicalFormPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ────────── Public routes ────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* ────────── Admin + Researcher ────────── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allow={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ────────── Researcher only ────────── */}
          <Route
            path="/research"
            element={
              <ProtectedRoute allow={["researcher"]}>
                <Research />
              </ProtectedRoute>
            }
          />

          {/* ────────── Zookeeper ────────── */}
          <Route
            path="/feeding"
            element={
              <ProtectedRoute allow={["admin", "zookeeper"]}>
                <Feeding />
              </ProtectedRoute>
            }
          />

          {/* ────────── Vet ────────── */}
          <Route
            path="/medical"
            element={
              <ProtectedRoute allow={["admin", "vet"]}>
                <Medical />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical/new"
            element={
              <ProtectedRoute allow={["admin", "vet"]}>
                <MedicalFormPage />
              </ProtectedRoute>
            }
          />

          {/* ────────── Admin only ────────── */}
          <Route
            path="/animals"
            element={
              <ProtectedRoute allow={["admin"]}>
                <AnimalList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/animals/new"
            element={
              <ProtectedRoute allow={["admin"]}>
                <AnimalForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/animals/:id/edit"
            element={
              <ProtectedRoute allow={["admin"]}>
                <AnimalForm isEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allow={["admin"]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* ────────── Fallback ────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}