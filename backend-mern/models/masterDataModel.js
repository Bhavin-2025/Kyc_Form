import mongoose from "mongoose";

const masterDataSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g. "category"
    label: { type: String, required: true }, // e.g. "Manufacturer"
    value: { type: String, required: true }, // e.g. "manufacturer"
  },
  { timestamps: true }
);

const MasterData = mongoose.model("MasterData", masterDataSchema);

export default MasterData;
