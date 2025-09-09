import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "../features/auth/authSlice"; // ✅ fixed path

import LoginPage from "../pages/LoginPage";
import KycPage from "../pages/KycPage";
import Layout from "../components/Layout";
import Step1BasicDetail from "../form/Step1BasicDetail";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <Routes>
      {/* Login route (no header) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes with header */}
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/kyc" element={<KycPage />} />
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
