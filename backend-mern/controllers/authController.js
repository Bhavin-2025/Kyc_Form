// import User from "../models/userModel.js";

// // @desc   Register a new user
// export const registerUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and password required" });
//     }

//     const trimmedUsername = username.trim();
//     const passwordStr = password.toString();

//     const userExists = await User.findOne({ username: trimmedUsername });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({
//       username: trimmedUsername,
//       password: passwordStr,
//     });

//     res.status(201).json({ message: "User registered successfully", user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // @desc   Login user
// export const loginUser = async (req, res) => {
//   try {
//     let { username, password } = req.body;

//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and password required" });
//     }

//     username = username.trim();
//     password = password.toString();

//     // 🔹 Debug logs
//     console.log("Login attempt:", username, password);

//     const user = await User.findOne({ username });

//     console.log("User from DB:", user);

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     res.json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         username: user.username,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const data = req.body;

    // Minimal required fields
    const required = [
      "username",
      "password",
      "gst",
      "primaryContact",
      "primaryEmail",
      "mobile",
      "country",
      "companyIndividual",
      "category",
    ];
    for (const field of required) {
      if (!data[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Transform / sanitize
    const username = String(data.username).trim();
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(String(data.password), salt);

    // Validate nested mobile shape
    const mobile = data.mobile;
    if (!mobile || !mobile.countryCode || !mobile.number) {
      return res
        .status(400)
        .json({ message: "Mobile object (countryCode, number) required" });
    }

    const userPayload = {
      username,
      password: hashed,
      category: data.category,
      companyIndividual: data.companyIndividual,
      business: data.business,
      gst: data.gst,
      primaryContact: data.primaryContact,
      primaryEmail: data.primaryEmail,
      secondaryEmail: data.secondaryEmail,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      country: data.country,
      mobile: {
        countryCode: mobile.countryCode,
        number: mobile.number,
      },
      phone: data.phone,
      fax: data.fax,
      salesPersonCountry: data.salesPersonCountry,
      assistantSalesPerson: data.assistantSalesPerson,
      remark: data.remark,
      registrationDate: data.registrationDate
        ? new Date(data.registrationDate)
        : undefined,
      department: data.department,
    };

    const user = await User.create(userPayload);

    // Return a safe user object (no password)
    const safeUser = {
      id: user._id,
      username: user.username,
      primaryEmail: user.primaryEmail,
      mobile: user.mobile,
    };

    res.status(201).json({ message: "User registered", user: safeUser });
  } catch (err) {
    console.error("registerUser error:", err);
    // Mongoose validation errors -> send message
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// export const loginUser = async (req, res) => {
//   try {
//     let { username, password } = req.body;
//     if (!username || !password)
//       return res
//         .status(400)
//         .json({ message: "Username and password required" });
//     username = username.trim();

//     const user = await User.findOne({ username });
//     if (!user)
//       return res.status(401).json({ message: "Invalid username or password" });

//     const match = await bcrypt.compare(String(password), user.password);
//     console.log(match, "match");

//     if (!match)
//       return res.status(401).json({ message: "Invalid username or password1" });

//     const safeUser = {
//       id: user._id,
//       username: user.username,
//       primaryEmail: user.primaryEmail,
//       mobile: user.mobile,
//     };
//     res.json({ message: "Login successful", user: safeUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// // };

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
