// // import express from "express";
// // import { getFarmerHistory, getDealerHistory } from "../controllers/historyController.js";

// // const router = express.Router();

// // // Farmer history route
// // router.get("/farmer/:id", getFarmerHistory);

// // // Dealer history route
// // router.get("/dealer/:id", getDealerHistory);

// // export default router;




// import express from "express";
// import { getFarmerHistory, getDealerHistory } from "../controllers/historyController.js";

// const router = express.Router();

// // Farmer history route
// router.get("/farmer/:id", getFarmerHistory);

// // Dealer history route
// router.get("/dealer/:id", getDealerHistory);

// // Combined route for both farmer and dealer (frontend ke liye)
// router.get("/:type/:id", async (req, res) => {
//   try {
//     const { type, id } = req.params;
//     console.log(`📡 History Request: ${type}/${id}`);
    
//     if (type === "farmer") {
//       const getFarmerHistory = require("../controllers/historyController.js").getFarmerHistory;
//       return getFarmerHistory(req, res);
//     } else if (type === "dealer") {
//       const getDealerHistory = require("../controllers/historyController.js").getDealerHistory;
//       return getDealerHistory(req, res);
//     } else {
//       return res.status(400).json({ error: "Invalid type" });
//     }
//   } catch (err) {
//     console.error("🔥 COMBINED HISTORY ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

import express from "express";
import {
  getFarmerHistory,
  getDealerHistory,
  getPondHistory
} from "../controllers/historyController.js";

const router = express.Router();

/* ===============================
   DIRECT ROUTES
================================ */
router.get("/farmer/:id", getFarmerHistory);
router.get("/dealer/:id", getDealerHistory);
router.get("/pond/:id", getPondHistory);

/* ===============================
   COMBINED ROUTE (FRONTEND)
================================ */
router.get("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    console.log(`📡 History Request: ${type}/${id}`);

    if (type === "farmer") {
      return getFarmerHistory(req, res);
    }
    if (type === "dealer") {
      return getDealerHistory(req, res);
    }
    if (type === "pond") {
      return getPondHistory(req, res);
    }

    return res.status(400).json({ error: "Invalid history type" });
  } catch (err) {
    console.error("🔥 COMBINED HISTORY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
