import express from "express";
import MasterData from "../models/masterDataModel.js";

const router = express.Router();

router.get("/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const data = await MasterData.find({ type });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
