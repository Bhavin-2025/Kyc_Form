import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "../features/auth/authSlice";

import LoginPage from "../pages/LoginPage";
import KycPage from "../pages/KycPage";
import AdminDashboard from "../pages/AdminDashboard";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(loadUserFromStorage());
    }
    setAuthChecked(true);
  }, [dispatch]);

  if (!authChecked) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      {/* Login route (no header) */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={user?.user?.role === "admin" ? "/admin" : "/kyc"} /> : <LoginPage />} 
      />

      {/* Protected routes with header */}
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/kyc" element={<KycPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Default redirect */}
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? <Navigate to={user?.user?.role === "admin" ? "/admin" : "/kyc"} /> 
            : <Navigate to="/login" />
        } 
      />
    </Routes>
  );
};

export default AppRoutes;