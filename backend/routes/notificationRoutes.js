import express from "express";
import {
  sendNotification,
  getNotifications,
  markSeen,
} from "../controllers/notificationController.js";

const router = express.Router();

// Admin → Send notification to agent
router.post("/send", sendNotification);

// Agent → Get all notifications
router.get("/:id", getNotifications);

// Agent → Mark as seen
router.post("/seen", markSeen);

export default router;
