// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true }, // in real projects, hash this with bcrypt
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;

import mongoose from "mongoose";

const phoneSubSchema = new mongoose.Schema({
  cc: {
    type: String,
    trim: true,
    match: [/^\d{1,4}$/, "Country code must be 1-4 digits"],
  },
  ndc: {
    type: String,
    trim: true,
    match: [/^\d{1,5}$/, "NDC must be 1-5 digits"],
  },
  number: {
    type: String,
    trim: true,
    match: [/^\d{6,10}$/, "Number must be 6-10 digits"],
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: 5,
    },
    category: { type: String, required: true, trim: true },
    companyIndividual: { type: String, required: true, trim: true },
    business: { type: String, trim: true },
    gst: {
      type: String,
      required: true,
      uppercase: true,
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
        "Invalid GSTIN",
      ],
    },
    primaryContact: {
      type: String,
      required: true,
      match: [/^[a-zA-Z\s]+$/, "Primary contact must be letters/spaces"],
      minlength: 3,
    },
    primaryEmail: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    secondaryEmail: {
      type: String,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    birthDate: { type: Date },
    country: { type: String, required: true },
    // mobile stored as object { countryCode, number }
    mobile: {
      countryCode: {
        type: String,
        required: [true, "Mobile country code required"],
        match: [/^\+\d{1,4}$/, "Invalid country code (e.g. +91)"],
      },
      number: {
        type: String,
        required: [true, "Mobile number required"],
        match: [
          /^[6-9]\d{9}$/,
          "Mobile must be a valid 10-digit Indian number",
        ],
      },
    },
    phone: { type: phoneSubSchema },
    fax: { type: phoneSubSchema },
    salesPersonCountry: { type: String },
    assistantSalesPerson: { type: String },
    remark: { type: String, maxlength: 250 },
    registrationDate: { type: Date },
    department: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
