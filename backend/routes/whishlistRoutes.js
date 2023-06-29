const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getWhishList,
  addToWhishlist,
  removeFromWhishlist,
} = require("../models/Whishlist/wishlist.model");

router.get("/", protect, getWhishList);
router.post("/addToWhishlist/:id", protect, addToWhishlist);
router.delete("/removeFromWhishlist/:id", protect, removeFromWhishlist);

module.exports = router;
