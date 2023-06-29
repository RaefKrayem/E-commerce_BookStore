const BooksSchema = require("./Book.js");
const UserSchema = require("../User/User.js");
const asyncHandler = require("express-async-handler");

const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await BooksSchema.find();

    // check if the book id is in the whishlist of the user
    const user = await UserSchema.findById(req.user._id);
    const whishlist = user.whishlist;

    // return the books with the whishlist field
    const newBooks = books.map((book) => {
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

const getBookById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const book = await BooksSchema.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const createBook = asyncHandler(async (req, res) => {
  const book = req.body;
  const newBook = new BooksSchema(book);
  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const updateBookQuantity = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;
  try {
    // find book by id from BookSchema and update quantity field
    const book = await BooksSchema.findById(id);
    book.quantity = quantity;
    await book.save();

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getCart = asyncHandler(async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id);
    const cart = user.cart;
    const cartBooks = await BooksSchema.find({
      _id: { $in: cart.map((item) => item.book) },
    });

    const newCartBooks = cartBooks.map((book) => {
      const cartItem = cart.find((item) => item.book.equals(book._id));
      if (cartItem) {
        return {
          ...book._doc,
          ordered_quantity: cartItem.quantity,
        };
      }
    });

    res.status(200).json(newCartBooks.filter((book) => book)); // Filter out any undefined books
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  const orderQuantity = req.body.order_quantity;

  try {
    const user = await UserSchema.findById(req.user._id);
    // Check if the book is already in the user's cart
    const cartItem = user.cart.find((item) => item.book.equals(bookId));

    if (cartItem) {
      // If the book is already in the cart, update the quantity
      cartItem.quantity += orderQuantity;
    } else {
      // If the book is not in the cart, add it as a new item
      user.cart.push({
        book: bookId,
        quantity: orderQuantity,
      });
    }

    await user.save();

    // get the book details from the BooksSchema
    const book = await BooksSchema.findById(bookId);

    res.status(200).json({
      message: "Added to cart",
      book: {
        ...book._doc,
        ordered_quantity: orderQuantity === 1 ? 1 : orderQuantity,
      },
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  try {
    const user = await UserSchema.findById(req.user._id);
    // Check if the book is already in the user's cart
    const cartItem = user.cart.find((item) => item.book.equals(bookId));

    if (cartItem) {
      user.cart = user.cart.filter((item) => !item.book.equals(bookId));
      await user.save();
      res
        .status(200)
        .json({ message: "Book removed from cart successfully", _id: bookId });
    } else {
      res.status(404).json({ message: "Book not found in cart" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const updateBookCartQuantity = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  const quantity = req.body.quantity;
  try {
    // update the quantity of the book in the user's cart
    const user = await UserSchema.findById(req.user._id);
    const cartItem = user.cart.find((item) => item.book.equals(bookId));
    cartItem.quantity = quantity;
    await user.save();

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBookQuantity,
  addToCart,
  removeFromCart,
  updateBookCartQuantity,
  getCart,
};
