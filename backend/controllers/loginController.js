// import User from "../models/userModel.js";
// import bcrypt from "bcryptjs";

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({ message: "Login successful", user });

//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };



import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ⭐⭐ MOST IMPORTANT LOGIC
    const isFirstLogin = user.lastLogin === null;

    // update lastLogin AFTER checking
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      user,
      isFirstLogin,   // ⭐⭐ SEND TO FRONTEND
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
