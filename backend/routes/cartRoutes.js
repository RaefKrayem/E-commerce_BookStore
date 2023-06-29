const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addToCart,
  removeFromCart,
  updateBookCartQuantity,
  getCart,
} = require("../models/Book/books.model");

router.get("/", protect, getCart);
router.post("/addToCart/:id", protect, addToCart);
router.delete("/removeFromCart/:id", protect, removeFromCart);
router.put("/updateBookCartQuantity/:id", protect, updateBookCartQuantity);

module.exports = router;
