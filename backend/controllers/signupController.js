


import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import fs from "fs";

/* =========================
   SIGNUP CONTROLLER
========================= */
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      age,
      address,
      accountNumber,
      ifsc,
    } = req.body;

    // ❌ Check required fields
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    // ❌ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Helper function to convert image to buffer
    const getFileBuffer = (file) => {
      if (!file) return null;
      return {
        data: fs.readFileSync(file.path),
        contentType: file.mimetype,
      };
    };

    // ✅ Create user
    const user = new User({
      name,
      email,
      mobile,
      age,
      address,
      accountNumber,
      ifsc,
      password: hashedPassword,

      profilePic: getFileBuffer(req.files?.profile?.[0]),
// photo: req.files?.profile?.[0]
//   ? `/uploads/${req.files.profile[0].filename}`
//   : null,



      aadharFront: getFileBuffer(req.files?.aadharFront?.[0]),
      aadharBack: getFileBuffer(req.files?.aadharBack?.[0]),
      panCard: getFileBuffer(req.files?.pan?.[0]),
      savingAccountImage: getFileBuffer(req.files?.savingImg?.[0]),
    });

    await user.save();

    // ❌ remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Signup successful",
      user: userResponse,
    });

  } catch (error) {
    console.error("SIGNUP ERROR 🔥", error);
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};
