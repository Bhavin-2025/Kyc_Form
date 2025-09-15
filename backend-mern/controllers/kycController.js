// controllers/kycController.js
import Kyc from "../models/kycModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const saveKyc = async (req, res) => {
  try {
    const { userId, ...kycData } = req.body;

    console.log(userId, "userid");

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Look for existing KYC record - note the model is imported as Kyc, not KYC
    let kyc = await Kyc.findOne({ createdBy: userId });

    if (kyc) {
      Object.assign(kyc, kycData);
      await kyc.save();

      return res.status(200).json({
        success: true,
        message: "KYC updated successfully",
        data: kyc,
      });
    } else {
      const newKyc = new Kyc({
        ...kycData,
        createdBy: userId,
      });

      await newKyc.save();

      return res.status(201).json({
        success: true,
        message: "KYC created successfully",
        data: newKyc,
      });
    }
  } catch (error) {
    console.error("KYC save error:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing KYC data",
      error: error.message,
    });
  }
};

// Get KYC basic detail
export const getBasicDetail = async (req, res) => {
  try {
    const { userId } = req.params;

    const kyc = await Kyc.findOne({ createdBy: userId });
    console.log(kyc, "kyc");
    if (!kyc) {
      return res.status(404).json({ message: "No KYC data found" });
    }

    res.status(200).json({ basicDetail: kyc });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching KYC", error: error.message });
  }
};
