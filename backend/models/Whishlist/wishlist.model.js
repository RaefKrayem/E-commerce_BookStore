const BooksSchema = require("../Book/Book");
const UserSchema = require("../User/User");

const asyncHandler = require("express-async-handler");

const getWhishList = asyncHandler(async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id);
    const whishlist = user.whishlist;
    const books = await BooksSchema.find();

    // add whishlist field to books that are in the whishlist and return the books that are in the whishlist
    const newBooks = books
      .filter((book) => whishlist.includes(book._id))
      .map((book) => {
        return {
          ...book._doc,
          whishlist: whishlist.includes(book._id),
        };
      });

    res.status(200).json(newBooks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const addToWhishlist = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  try {
    const user = await UserSchema.findById(req.user._id);
    // add to whishlist if not already in whishlist
    if (user.whishlist.includes(bookId)) {
      return res.status(409).json({ message: "Book already in whishlist" });
    } else {
      user.whishlist.push(bookId);
      await user.save();
      // get the book that was added to the whishlist and return it with the whishlist field
      const book = await BooksSchema.findById(bookId);
      res.status(200).json({ book: { ...book._doc, whishlist: true } });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const removeFromWhishlist = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  try {
    const user = await UserSchema.findById(req.user._id);
    user.whishlist = user.whishlist.filter((item) => !item.equals(bookId));
    await user.save();
    res.json({
      message: "Book removed from whishlist successfully",
      _id: bookId,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

module.exports = {
  getWhishList,
  addToWhishlist,
  removeFromWhishlist,
};
