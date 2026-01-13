// import User from "../models/userModel.js";
// import OTPModel from "../models/otpModel.js";
// import axios from "axios";

// // SEND OTP
// export const sendOtp = async (req, res) => {
//   try {
//     const { mobile } = req.body;

//     if (!mobile) return res.status(400).json({ message: "Mobile number required" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save OTP in DB
//     await OTPModel.findOneAndUpdate(
//       { mobile },
//       { otp, createdAt: Date.now() },
//       { upsert: true }
//     );

//     // MSG91 API
//     await axios.post(
//       `https://api.msg91.com/api/v5/otp?otp=${otp}&mobile=91${mobile}`,
//       {},
//       {
//         headers: {
//           "authkey": process.env.MSG91_AUTH_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({ message: "OTP sent successfully" });

//   } catch (error) {
//     res.status(500).json({ message: "Failed to send OTP", error: error.message });
//   }
// };

// // VERIFY OTP
// export const verifyOtp = async (req, res) => {
//   try {
//     const { mobile, otp } = req.body;

//     const otpRecord = await OTPModel.findOne({ mobile });

//     if (!otpRecord) return res.status(400).json({ message: "OTP not found" });

//     if (otpRecord.otp !== otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     // Optional: OTP Expire (5 min)
//     if (Date.now() - otpRecord.createdAt > 5 * 60 * 1000)
//       return res.status(400).json({ message: "OTP expired" });

//     const user = await User.findOne({ mobile });

//     if (!user) return res.status(400).json({ message: "User not found" });

//     res.json({ message: "OTP Verified", user });

//   } catch (error) {
//     res.status(500).json({ message: "OTP Verification failed", error: error.message });
//   }
// };

