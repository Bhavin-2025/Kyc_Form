// controllers/authController.js
import User from "../models/userModel.js";

// @desc   Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({ username, password });
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("data", username, password);

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Modified/New Code
    // Include role in the response
    res.json({ 
      message: "Login successful", 
      user: {
        _id: user._id,
        username: user.username,
        role: user.role
      } 
    });
    // End of Modified/New Code
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};