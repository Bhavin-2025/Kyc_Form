// backend-mern/scripts/seedAdminUser.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const seedAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Check if admin already exists
    const adminExists = await User.findOne({ username: "admin" });
    
    if (adminExists) {
      console.log("Admin user already exists");
    } else {
      // Create admin user
      await User.create({
        username: "admin",
        password: "admin123",
        role: "admin"
      });
      console.log("Admin user created successfully");
    }

    console.log("✅ Admin user seeding complete");
    process.exit();
  } catch (err) {
    console.error("Error seeding admin user:", err);
    process.exit(1);
  }
};

seedAdminUser();
