import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // in real projects, hash this with bcrypt
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
