import express from "express";
import { getMasterData } from "../controllers/masterData.js";

const router = express.Router();

// Example: GET /api/master/category
router.get("/:type", getMasterData);

export default router;
