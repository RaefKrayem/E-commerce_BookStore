const express = require("express");
const router = express.Router();
const {
  getOrderInfo,
  createOrder,
  deleteOrder,
  getOrders,
} = require("../models/Order/order.model.js");
const { protect } = require("../middleware/authMiddleware.js");

router.get("/", protect, getOrders);
router.get("/order/:id", protect, getOrderInfo);
router.post("/place", protect, createOrder);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
