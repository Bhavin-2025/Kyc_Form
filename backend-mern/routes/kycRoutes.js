import express from "express";
import { saveKyc, getBasicDetail } from "../controllers/kycController.js";

const router = express.Router();

router.post("/basic-detail", saveKyc);
router.get("/basic-detail/:userId", getBasicDetail);

export default router;
