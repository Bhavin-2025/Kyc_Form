import mongoose from "mongoose";
import dotenv from "dotenv";
import MasterData from "../models/masterDataModel.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const seedData = [
  // Category
  { type: "category", label: "Manufacturer", value: "manufacturer" },
  { type: "category", label: "Distributor", value: "distributor" },
  { type: "category", label: "Retailer", value: "retailer" },

  // Country
  { type: "country", label: "India", value: "IN" },
  { type: "country", label: "United States", value: "US" },
  { type: "country", label: "Canada", value: "CA" },

  // Business Type
  { type: "businessType", label: "Private Limited", value: "pvt_ltd" },
  { type: "businessType", label: "Public Limited", value: "public_ltd" },
  { type: "businessType", label: "Partnership", value: "partnership" },
  { type: "businessType", label: "Proprietorship", value: "proprietorship" },

  // Department
  { type: "department", label: "Sales", value: "sales" },
  { type: "department", label: "Marketing", value: "marketing" },
  { type: "department", label: "HR", value: "hr" },
  { type: "department", label: "Finance", value: "finance" },

  // Sales Person
  { type: "salesPerson", label: "John Doe", value: "john_doe" },
  { type: "salesPerson", label: "Jane Smith", value: "jane_smith" },
  { type: "salesPerson", label: "Amit Kumar", value: "amit_kumar" },

  // Assistant Sales Person
  { type: "assistantSalesPerson", label: "Ravi Patel", value: "ravi_patel" },
  {
    type: "assistantSalesPerson",
    label: "Priya Sharma",
    value: "priya_sharma",
  },
  { type: "assistantSalesPerson", label: "Michael Lee", value: "michael_lee" },
];

const importData = async () => {
  try {
    await MasterData.deleteMany(); // Clear old data
    await MasterData.insertMany(seedData);
    console.log("✅ Master Data Seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
