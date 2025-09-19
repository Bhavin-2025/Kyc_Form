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

// backend-mern/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import masterDataRoutes from "./routes/masterDataRoutes.js";
import kycRoutes from "./routes/kycRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/master", masterDataRoutes);
app.use("/api/kyc", kycRoutes);

app.options("*", cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });
