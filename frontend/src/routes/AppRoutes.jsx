import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import KycPage from "../pages/KycPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./features/auth/authSlice";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kyc" element={<KycPage />} />
    </Routes>
  );
};

export default AppRoutes;
