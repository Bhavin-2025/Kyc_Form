// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://p5tgmv3m-5000.inc1.devtunnels.ms/api", // ✅ your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
