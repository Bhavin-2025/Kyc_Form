import User from "../models/userModel.js";

// @desc   Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const trimmedUsername = username.trim();
    const passwordStr = password.toString();

    const userExists = await User.findOne({ username: trimmedUsername });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username: trimmedUsername,
      password: passwordStr,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Login user
export const loginUser = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    username = username.trim();
    password = password.toString();

    // 🔹 Debug logs
    console.log("Login attempt:", username, password);

    const user = await User.findOne({ username });

    console.log("User from DB:", user);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
