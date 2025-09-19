// controllers/kycController.js
import Kyc from "../models/kycModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const saveKyc = async (req, res) => {
  try {
    const { userId, ...kycData } = req.body;

    console.log(req.body, "req.body");

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

    // Look for existing KYC record
    let kyc = await Kyc.findOne({ createdBy: userId });

    // Handle mobileLogin field - ensure it's stored as a string
    if (kycData.mobileLogin) {
      kycData.mobileLogin = String(kycData.mobileLogin);
    }

    // Handle address data
    if (kycData.addresses && Array.isArray(kycData.addresses)) {
      // The addresses array is already properly formatted
      console.log("Received addresses array:", kycData.addresses);
    } else if (kycData.addressType) {
      // Create an address object from individual fields
      const addressObject = {
        addressType: kycData.addressType,
        companyName: kycData.companyName,
        contactNo: kycData.contactNo,
        unit: kycData.unit,
        building: kycData.building,
        street: kycData.street,
        landmark: kycData.landmark,
        area: kycData.area,
        countryAddress: kycData.countryAddress,
        state: kycData.state,
        city: kycData.city,
        postalCode: kycData.postalCode,
      };

      // Set the addresses array with this object
      kycData.addresses = [addressObject];
      console.log("Created address object:", addressObject);
    }

    if (kyc) {
      // Update existing KYC record

      // Special handling for addresses array
      if (kycData.addresses && Array.isArray(kycData.addresses)) {
        // If the KYC record already has addresses, append the new ones
        if (kyc.addresses && Array.isArray(kyc.addresses)) {
          // Check if we're updating an existing address (by addressType)
          const existingAddressIndex = kyc.addresses.findIndex(
            (addr) => addr.addressType === kycData.addresses[0].addressType
          );

          if (existingAddressIndex >= 0) {
            // Update existing address
            kyc.addresses[existingAddressIndex] = {
              ...kyc.addresses[existingAddressIndex],
              ...kycData.addresses[0],
            };
          } else {
            // Add new address
            kyc.addresses.push(...kycData.addresses);
          }
        } else {
          // Initialize addresses array
          kyc.addresses = [...kycData.addresses];
        }

        // Remove addresses from kycData to avoid duplication
        delete kycData.addresses;
      }

      // Update all other fields
      Object.assign(kyc, kycData);
      await kyc.save();

      return res.status(200).json({
        success: true,
        message: "KYC updated successfully",
        data: kyc,
      });
    } else {
      // Create new KYC record
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
    console.log("user", kyc);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching KYC", error: error.message });
  }
};
