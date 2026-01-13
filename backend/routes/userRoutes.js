

import express from "express";
import multer from "multer";

// ⭐ IMPORT SIGNUP CONTROLLER
import { signup } from "../controllers/signupController.js";

// ⭐ IMPORT USER CONTROLLERS
import {
  getUser,
  updateProfile,
  updatePassword,
  updatePhoto,
  getAllUsers,
} from "../controllers/userController.js";

import { login } from "../controllers/loginController.js";

const router = express.Router();

// ======================
// ⭐ MULTER CONFIG
// ======================

// 🔹 1. Disk storage (SIGNUP images – unchanged)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 🔹 2. Memory storage (PROFILE PHOTO UPDATE – NEW)
const uploadMemory = multer({
  storage: multer.memoryStorage(),
});

// ======================
// ⭐ ALL ROUTES
// ======================

// ✅ SIGNUP (With Files – DISK STORAGE)
router.post(
  "/signup",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "savingImg", maxCount: 1 },
  ]),
  signup
);

// LOGIN
router.post("/login", login);

// GET USER BY ID
router.get("/:id", getUser);

// UPDATE PROFILE (NAME)
router.put("/:id", updateProfile);

// UPDATE PASSWORD
router.put("/password/:id", updatePassword);

// ✅ UPDATE PHOTO (MEMORY STORAGE – FIXED)
router.put(
  "/photo/:id",
  uploadMemory.single("photo"),
  updatePhoto
);

// GET ALL USERS
router.get("/", getAllUsers);

export default router;
