const express = require("express");
const router = express.Router();

const {
  getUserInfo,
  createUser,
  updateUser,
} = require("../models/User/user.model.js");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.post("/login", getUserInfo);
router.put("/profile", protect, updateUser);

module.exports = router;
