import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Register (for testing)
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

export default router;
