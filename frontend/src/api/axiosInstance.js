// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
