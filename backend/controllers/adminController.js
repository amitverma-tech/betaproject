


import User from "../models/userModel.js";
import Farmer from "../models/farmerModel.js";
import Dealer from "../models/dealerModel.js";

// 1️⃣ Get all agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }, { password: 0 });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2️⃣ Get all farmers + dealers of a specific agent
export const getAgentDetails = async (req, res) => {
  try {
    const agentId = req.params.id; // ✅ use req.params.id

    const farmers = await Farmer.find({ createdBy: agentId });
    const dealers = await Dealer.find({ createdBy: agentId });

    res.json({ farmers, dealers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
