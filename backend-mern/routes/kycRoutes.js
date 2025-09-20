// backend-mern/routes/kycRoutes.js

import express from "express";
import { saveKyc, getBasicDetail, getAllKycData, getAllUsers } from "../controllers/kycController.js";

const router = express.Router();

router.post("/basic-detail", saveKyc);
router.get("/basic-detail/:userId", getBasicDetail);
router.get("/all", getAllKycData); // Endpoint for admin to get all KYC data
router.get("/users", getAllUsers); // Endpoint for admin to get all users

export default router;