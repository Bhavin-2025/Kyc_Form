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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
