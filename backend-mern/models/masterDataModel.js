import mongoose from "mongoose";

const masterSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "category", "businessType"
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const MasterData = mongoose.model("MasterData", masterSchema);

export default MasterData;
