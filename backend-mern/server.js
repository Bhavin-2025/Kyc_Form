// // backend-mern/server.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import authRoutes from "./routes/authRoutes.js";
// import masterDataRoutes from "./routes/masterDataRoutes.js";
// import kycRoutes from "./routes/kycRoutes.js";

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/master", masterDataRoutes);
// app.use("/api/kyc", kycRoutes);

// app.options("*", cors());

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () =>
//       console.log(`✅ Server running on http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.error("Mongo connection error:", err);
//   });

// backend - mern / server.js;

// backend-mern/server.js (CORS section)
// backend-mern/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import masterDataRoutes from "./routes/masterDataRoutes.js";
import kycRoutes from "./routes/kycRoutes.js";

dotenv.config();

const app = express();

// ------------------ CORS Setup ------------------
const allowedOrigins = [
  process.env.FRONTEND_URL, // production Vercel origin
  "http://localhost:5173", // Vite dev
  "http://localhost:5000", // local backend frontend
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // If no origin (Postman, curl) → allow
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  }

  // Preflight check
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
// ------------------------------------------------

// Parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/master", masterDataRoutes);
app.use("/api/kyc", kycRoutes);

// Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });
