// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// This component handles user login and redirects based on role

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();
  const { role, loading } = useAuth(); // comes from AuthContext

  /* -------- handle form submit -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pwd);
      // Navigation happens in useEffect once role is available
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setSigningIn(false);
    }
  };

  /* -------- redirect after login -------- */
  useEffect(() => {
    if (!loading && role) {
      const path =
        role === "admin"
          ? "/dashboard"
          : role === "zookeeper"
          ? "/feeding"
          : role === "vet"
          ? "/medical"
          : role === "researcher"
          ? "/research"
          : "/";
      navigate(path, { replace: true });
    }
  }, [loading, role, navigate]);

  /* -------- optional global loading spinner -------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-400 border-t-transparent mb-4"></div>
          <p className="text-emerald-100 text-xl font-medium">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  /* -------- login form -------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Glass morphism container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl">🐾</span>
            </div>
            <h1 className="text-white text-3xl font-bold mb-2">
              ZooKeeper Hub
            </h1>
            <p className="text-emerald-200 text-sm">
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* Error message with better styling */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-200 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div className="relative">
              <label className="block text-emerald-200 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full h-14 pl-12 pr-4 bg-white/10 border rounded-2xl text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                    focusedField === "email"
                      ? "border-emerald-400 focus:ring-emerald-400/50 bg-white/15"
                      : "border-white/20 hover:border-white/30"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  required
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            {/* Password input */}
            <div className="relative">
              <label className="block text-emerald-200 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full h-14 pl-12 pr-12 bg-white/10 border rounded-2xl text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                    focusedField === "password"
                      ? "border-emerald-400 focus:ring-emerald-400/50 bg-white/15"
                      : "border-white/20 hover:border-white/30"
                  }`}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  required
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={signingIn}
              className={`w-full h-14 rounded-2xl font-semibold text-white transition-all duration-300 transform ${
                signingIn
                  ? "bg-emerald-500/50 cursor-not-allowed scale-95"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-emerald-500/25"
              }`}
            >
              {signingIn ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Sign In</span>
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-emerald-200/70 text-sm">
              Secure access to your zoo management system
            </p>
          </div>
        </div>

        {/* Additional decorative element */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}