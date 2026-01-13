

// orderRoutes.js
import express from "express";
import {
  placeOrder,
  getDealerOrders,
  getOrdersByDealerInfo,
  getAllOrders,
  deleteOrder  // 👈 नया import add करें
} from "../controllers/orderController.js";

const router = express.Router();

// ✅ Correct routes with proper paths
router.post("/", placeOrder); // POST /api/orders
router.get("/", getAllOrders); // GET /api/orders (with optional dealerId query)
router.get("/by-info", getOrdersByDealerInfo); // GET /api/orders/by-info?name=...&shopAddress=...
router.get("/dealer/:id", getDealerOrders); // GET /api/orders/dealer/:id
router.delete("/:id", deleteOrder); // 👈 DELETE /api/orders/:id - YEH ADD KARNA HAI

export default router;