import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  cc: { type: String },
  ndc: { type: String },
  number: { type: String },
});

const kycSchema = new mongoose.Schema(
  {
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
    term: { type: String },
    role: { type: String },
    username: { type: String },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const KYC = mongoose.model("KYC", kycSchema);

export default KYC;
