// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Feeding from "./pages/Feeding";
import Medical from "./pages/Medical";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import AnimalList from "./pages/AnimalList";
import AnimalForm from "./components/AnimalForm";
import UsersPage from "./pages/UsersPage";

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
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/feeding"
            element={
              <ProtectedRoute allow={["admin", "zookeeper"]}>
                <Layout>
                  <Feeding />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/medical"
            element={
              <ProtectedRoute allow={["admin", "vet"]}>
                <Layout>
                  <Medical />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/animals"
            element={
              <ProtectedRoute allow={["admin"]}>
                <Layout>
                  <AnimalList />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/animals/new"
            element={
              <ProtectedRoute allow={["admin"]}>
                <Layout>
                  <AnimalForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/animals/:id/edit"
            element={
              <ProtectedRoute allow={["admin"]}>
                <Layout>
                  <AnimalForm isEdit />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/users"
            element={
              <ProtectedRoute allow={["admin"]}>
                <Layout>
                  <UsersPage />
                </Layout>
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