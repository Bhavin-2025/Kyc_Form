import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  cc: { type: String },
  ndc: { type: String },
  number: { type: String },
});

// Modified/New Code - Add address schema
const addressSchema = new mongoose.Schema({
  addressType: { type: String },
  companyName: { type: String },
  contactNo: { type: String },
  unit: { type: String },
  building: { type: String },
  street: { type: String },
  landmark: { type: String },
  area: { type: String },
  countryAddress: { type: String },
  state: { type: String },
  city: { type: String },
  postalCode: { type: String },
});

const kycSchema = new mongoose.Schema(
  {
    // Basic Details
    category: { type: String, required: false },
    companyIndividual: { type: String, required: false },
    business: { type: String, required: false },
    gst: { type: String, required: false },
    primaryContact: { type: String, required: false },
    primaryEmail: { type: String, required: false },
    secondaryEmail: { type: String },
    birthDate: { type: Date },
    registrationDate: { type: Date },
    country: { type: String, required: false },
    mobile: {
      countryCode: { type: String },
      number: { type: String },
    },
    phone: phoneSchema,
    fax: phoneSchema,
    salesPersonCountry: { type: String, required: false },
    assistantSalesPerson: { type: String },
    remark: { type: String },
    department: { type: String, required: false },

    // Term Details
    currency: { type: String, required: false },
    dayTerm: { type: Number, required: false },
    termName: { type: String },
    ext: { type: Number },
    rap: { type: Number },
    extra: { type: Number },
    creditLimit: { type: Number },
    memoLimit: { type: Number },
    party: { type: String },
    broker: { type: String },

    // User Details
    term: { type: String },
    role: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    // Modified/New Code - Fix mobileLogin field
    mobileLogin: { type: String }, // Changed from Number to String for consistency
    location: { type: String },

    // Additional Discount
    mumbai: { type: Number },
    hongkong: { type: Number },
    newyork: { type: Number },
    belgium: { type: Number },

    // Support for multiple addresses
    addresses: [addressSchema],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const KYC = mongoose.model("KYC", kycSchema);

export default KYC;
