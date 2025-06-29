// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, allow = [] }) {
  const { user, role, loading } = useAuth();

  // ✅ keep waiting until we know both user *and* role
  if (loading || (user && role === null)) return null; // or spinner

  if (!user) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(role)) return <Navigate to="/" replace />;
  console.log("ProtectedRoute:", { loading, uid: user?.uid, role, allow });

  return children;
}
