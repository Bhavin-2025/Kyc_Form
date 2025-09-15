import mongoose from "mongoose";
import dotenv from "dotenv";
import MasterData from "../models/masterDataModel.js";

dotenv.config();

const seedData = [
  { type: "category", label: "Retail", value: "retail" },
  { type: "category", label: "Wholesale", value: "wholesale" },

  { type: "businessType", label: "Private Ltd", value: "pvtltd" },
  { type: "businessType", label: "Partnership", value: "partnership" },

  { type: "country", label: "India", value: "IN" },
  { type: "country", label: "USA", value: "US" },

  { type: "department", label: "Sales", value: "sales" },
  { type: "department", label: "Support", value: "support" },

  { type: "salesPerson", label: "John Doe", value: "john" },
  { type: "salesPerson", label: "Jane Smith", value: "jane" },

  { type: "assistantSalesPerson", label: "Mike", value: "mike" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await MasterData.deleteMany();
    await MasterData.insertMany(seedData);
    console.log("✅ Master data seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
