// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, allow }) {
  const { user, role, loading } = useAuth();

  if (loading) return null;               // or a spinner
  if (!user) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(role)) return <Navigate to="/dashboard" replace />;

  return children;
}
