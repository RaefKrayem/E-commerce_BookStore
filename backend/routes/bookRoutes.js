const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBookQuantity,
} = require("../models/Book/books.model");

router.get("/", protect, getAllBooks);
router.get("/:id", protect, getBookById);
router.post("/", protect, createBook);
router.put("/:id", protect, updateBookQuantity);

module.exports = router;
