

import express from "express";
import { getAllAgents, getAgentDetails } from "../controllers/adminController.js";

const router = express.Router();

// Get all agents
router.get("/agents", getAllAgents);

// Get specific agent's farmers + dealers
router.get("/agents/:id/details", getAgentDetails);

export default router;
