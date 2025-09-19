// // src/api/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api", // ✅ your backend API
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosInstance;

// frontend/src/api/axiosInstance.js
import axios from "axios";

// Use Vite env var (set in Vercel). Fallback to the Render backend URL if needed.
const API_URL = import.meta.env.VITE_API_URL || "https://kyc-form.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  // if you use cookies for auth, enable:
  // withCredentials: true
});

export default axiosInstance;
